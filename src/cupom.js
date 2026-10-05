// Delivery 3001 · regra do cupom PRIMEIRA10
// Versão em produção: v1.0.0
//
// Regra combinada com o negócio (docs/casos-de-uso.md, UC-03):
//   10% de desconto sobre o subtotal
//   só no primeiro pedido do cliente
//   só para subtotal a partir de R$ 50,00
//   desconto máximo de R$ 15,00
//   o frete não entra no desconto
//
// Este é o código que o colega entregou na Aula 6.
// Os testes automáticos passam... mas será que eles testam o que importa?

function totalComCupom(pedido, cliente) {
  let total = pedido.subtotal + pedido.frete;
  if (pedido.subtotal >= 50 &&
      cliente.pedidosAnteriores == 0) {
    let desconto = total * 0.10;
    total = total - desconto;
  }
  return total;
}

// Permite usar a função no navegador e também nos testes automáticos (Node).
if (typeof module !== "undefined") {
  module.exports = { totalComCupom };
}
