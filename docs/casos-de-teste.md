# Casos de teste · cupom PRIMEIRA10

Todo caso de teste nasce de um caso de uso. Os daqui nascem do **UC-03 Aplicar cupom** ([casos-de-uso.md](casos-de-uso.md)) e foram levantados pela turma na Aula 6.

Formato de cada caso: **ID · caso de uso de origem · pré-condição · entrada ou passos · resultado esperado**. O resultado obtido só existe na hora de executar. Se ele for diferente do esperado, achamos um defeito.

Este arquivo tem duas partes, e a diferença entre elas é o assunto da aula:

| | Quem executa | Quando |
|---|---|---|
| **Casos automatizados** | um robô (o GitHub Actions) | a cada mudança proposta, sozinho |
| **Casos manuais** | uma pessoa, seguindo os passos | quando alguém lembra de fazer |

---

## Casos automatizados

> **Este quadro é executável.** O robô lê cada linha, roda a função `totalComCupom` com esses valores e compara com o total esperado. Se uma linha falhar, a proposta de mudança fica com um **X vermelho**.
>
> Para criar um teste novo, basta **acrescentar uma linha** no fim do quadro, no mesmo formato. Valores em reais, com vírgula ou ponto. Na coluna "Primeiro pedido?", escreva `sim` ou `não`.

| ID | Situação | Subtotal | Frete | Primeiro pedido? | Total esperado | Origem |
|---|---|---|---|---|---|---|
| CT-01 | Caminho feliz: primeiro pedido acima do mínimo | 60,00 | 0,00 | sim | 54,00 | Aula 6 |
| CT-02 | Cliente antigo não ganha desconto | 80,00 | 5,00 | não | 85,00 | Aula 6 |
| CT-03 | Subtotal abaixo do mínimo, cupom não entra | 40,00 | 0,00 | sim | 40,00 | Jeferson, Aula 6 |
| CT-04 | Cliente antigo com pedido grande | 120,00 | 0,00 | não | 120,00 | Aula 6 |

Repare: todos passam, e o código da v1.0.0 **tem defeitos**. Teste que só confirma o óbvio dá a sensação de segurança sem dar a segurança.

---

## Casos manuais

Estes casos ainda dependem de uma pessoa. Alguns poderiam virar linha do quadro automatizado. Outros precisam de outro tipo de teste.

### Achados na caça ao bug (Aula 6), ainda fora do robô

| ID | Situação | Subtotal | Frete | Primeiro pedido? | Total esperado | Origem |
|---|---|---|---|---|---|---|
| CT-05 | Subtotal exatamente no mínimo | 50,00 | 0,00 | sim | 45,00 | Turma, Aula 6 |
| CT-06 | O frete não pode entrar no desconto | 100,00 | 10,00 | sim | 100,00 | Jeferson, Aula 6 |
| CT-07 | Desconto não passa de R$ 15,00 | 200,00 | 0,00 | sim | 185,00 | Jeferson, Aula 6 |

### Casos que pedem uma pessoa ou outro tipo de teste

**CT-08 · Remover item depois de aplicar o cupom** *(proposto pelo Jeferson, Aula 6)*
- Caso de uso: UC-03 Aplicar cupom
- Pré-condição: primeiro pedido, carrinho com R$ 60,00, cupom PRIMEIRA10 já aplicado
- Passos: remover um item de R$ 20,00 do carrinho e fechar o pedido
- Esperado: o sistema recalcula o subtotal (R$ 40,00), retira o cupom e avisa o cliente

**CT-09 · Aplicar o mesmo cupom duas vezes** *(proposto pelo Jeferson, Aula 6)*
- Caso de uso: UC-03 Aplicar cupom
- Pré-condição: primeiro pedido, carrinho com R$ 80,00, cupom já aplicado
- Passos: aplicar PRIMEIRA10 de novo
- Esperado: o segundo uso é recusado; o desconto continua R$ 8,00

**CT-10 · Alterar o preço pelo inspetor do navegador** *(proposto pelo Jeferson, Aula 6)* · teste de **segurança**
- Caso de uso: UC-02 Fazer pedido
- Pré-condição: cliente logado com item de R$ 30,00 no carrinho
- Passos: abrir o inspetor do navegador, trocar o preço exibido para R$ 1,00 e fechar o pedido
- Esperado: o valor cobrado continua R$ 30,00, porque o preço é calculado no servidor, não na tela

**CT-11 · Cartão recusado pelo gateway** · teste de **integração**
- Caso de uso: UC-04 Pagar pedido
- Pré-condição: pedido de R$ 70,00 pronto para pagar
- Passos: pagar com um cartão que o gateway recusa
- Esperado: o pedido não é enviado ao restaurante; o cliente vê a recusa e pode trocar a forma de pagamento

**CT-12 · Sexta-feira, 20h, mil pedidos ao mesmo tempo** · teste de **carga** e **estresse**
- Caso de uso: UC-02 Fazer pedido
- Pré-condição: ambiente de teste com volume simulado de uma sexta à noite
- Passos: disparar 1.000 pedidos em 1 minuto
- Esperado: todos os pedidos confirmados em até 5 segundos, nenhum pedido perdido

**CT-13 · Horário do pedido para quem está em Manaus** · teste de **sistema**
- Caso de uso: UC-05 Acompanhar entrega
- Pré-condição: cliente em Manaus (uma hora a menos que Brasília) faz um pedido às 19h
- Passos: abrir o acompanhamento do pedido
- Esperado: o horário exibido é 19h, no fuso do cliente

---

## Como um caso manual vira automatizado

1. Escolha uma linha da tabela "Achados na caça ao bug".
2. Copie a linha para o fim do quadro **Casos automatizados**.
3. Proponha a mudança (veja o [README](../README.md#como-participar-sem-instalar-nada)).
4. Veja o robô rodar. Se o caso pega um defeito, ele fica **vermelho**. Isso é bom: o teste fez o trabalho dele.
