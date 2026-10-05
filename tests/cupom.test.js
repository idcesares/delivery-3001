// Robô de testes do Delivery 3001
//
// Não tem caso de teste escrito aqui dentro. O robô lê o quadro
// "Casos automatizados" de docs/casos-de-teste.md, roda cada linha
// contra src/cupom.js e compara com o total esperado.
// Ou seja: o documento É o teste.
//
// Para rodar no seu computador (opcional): node tests/cupom.test.js

const fs = require("fs");
const path = require("path");
const { totalComCupom } = require("../src/cupom.js");

const ARQUIVO = path.join(__dirname, "..", "docs", "casos-de-teste.md");
const SECAO = "## casos automatizados";

function semAcento(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function paraNumero(texto) {
  const limpo = String(texto).replace(/R\$/gi, "").replace(/\s/g, "");
  // "1.234,56" -> 1234.56 ; "50,00" -> 50 ; "50.5" -> 50.5
  const normalizado = limpo.includes(",")
    ? limpo.replace(/\./g, "").replace(",", ".")
    : limpo;
  const valor = Number(normalizado);
  if (normalizado === "" || Number.isNaN(valor)) {
    throw new Error(`não entendi o valor "${texto}"`);
  }
  return valor;
}

function paraSimNao(texto) {
  const t = semAcento(texto);
  if (["sim", "s", "yes", "true"].includes(t)) return true;
  if (["nao", "n", "no", "false"].includes(t)) return false;
  throw new Error(`na coluna "Primeiro pedido?" use sim ou não (veio "${texto}")`);
}

function celulas(linha) {
  return linha.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function lerQuadro() {
  const linhas = fs.readFileSync(ARQUIVO, "utf8").split(/\r?\n/);
  const inicio = linhas.findIndex((l) => semAcento(l).startsWith(SECAO));
  if (inicio === -1) throw new Error('não encontrei a seção "## Casos automatizados"');

  const tabela = [];
  let dentro = false;
  for (let i = inicio + 1; i < linhas.length; i++) {
    const l = linhas[i].trim();
    if (l.startsWith("|")) {
      dentro = true;
      tabela.push({ texto: l, numero: i + 1 });
    } else if (dentro) {
      break; // a tabela acabou
    } else if (l.startsWith("#")) {
      break; // chegou na próxima seção sem achar tabela
    }
  }
  if (tabela.length < 3) throw new Error("o quadro de casos automatizados está vazio");

  const cabecalho = celulas(tabela[0].texto).map(semAcento);
  const col = (nome) => {
    const i = cabecalho.findIndex((c) => c.startsWith(nome));
    if (i === -1) throw new Error(`faltou a coluna "${nome}" no quadro`);
    return i;
  };
  const C = {
    id: col("id"),
    situacao: col("situacao"),
    subtotal: col("subtotal"),
    frete: col("frete"),
    primeiro: col("primeiro"),
    esperado: col("total esperado"),
  };

  return tabela.slice(2).map(({ texto, numero }) => {
    const c = celulas(texto);
    return {
      numero,
      id: c[C.id] || `linha ${numero}`,
      situacao: c[C.situacao] || "",
      bruto: c,
      C,
    };
  });
}

function rodar() {
  const casos = lerQuadro();
  const resultados = [];

  for (const caso of casos) {
    const { bruto, C } = caso;
    try {
      const subtotal = paraNumero(bruto[C.subtotal]);
      const frete = paraNumero(bruto[C.frete]);
      const primeiro = paraSimNao(bruto[C.primeiro]);
      const esperado = paraNumero(bruto[C.esperado]);
      const obtido = totalComCupom(
        { subtotal, frete },
        { pedidosAnteriores: primeiro ? 0 : 1 }
      );
      const passou = Math.abs(obtido - esperado) < 0.005;
      resultados.push({ ...caso, esperado, obtido, status: passou ? "PASSOU" : "FALHOU" });
    } catch (erro) {
      resultados.push({ ...caso, status: "LINHA COM ERRO", detalhe: erro.message });
    }
  }

  const reais = (v) => (typeof v === "number" ? "R$ " + v.toFixed(2).replace(".", ",") : "");

  console.log("\nDelivery 3001 · robô de testes do cupom PRIMEIRA10\n");
  for (const r of resultados) {
    const linha = `[${r.status}] ${r.id} · ${r.situacao}`;
    if (r.status === "PASSOU") console.log(linha);
    else if (r.status === "FALHOU") {
      console.log(`${linha}\n          esperado ${reais(r.esperado)} · o código devolveu ${reais(r.obtido)}`);
    } else console.log(`${linha}\n          ${r.detalhe} (linha ${r.numero} do docs/casos-de-teste.md)`);
  }

  const falhas = resultados.filter((r) => r.status !== "PASSOU");
  console.log(`\n${resultados.length - falhas.length} de ${resultados.length} casos passaram.`);

  // Resumo bonito na página do GitHub Actions
  if (process.env.GITHUB_STEP_SUMMARY) {
    const md = [
      "## Robô de testes · cupom PRIMEIRA10",
      "",
      falhas.length === 0
        ? "**Todos os casos passaram.** Isso não prova que não há defeito: prova que nenhum caso do quadro achou um."
        : `**${falhas.length} caso(s) falharam.** O teste fez o trabalho dele: achou um lugar onde o código não segue a regra.`,
      "",
      "| Resultado | ID | Situação | Esperado | Obtido |",
      "|---|---|---|---|---|",
      ...resultados.map(
        (r) => `| ${r.status} | ${r.id} | ${r.situacao} | ${reais(r.esperado)} | ${r.detalhe ? r.detalhe : reais(r.obtido)} |`
      ),
      "",
    ].join("\n");
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  }

  process.exit(falhas.length === 0 ? 0 : 1);
}

rodar();
