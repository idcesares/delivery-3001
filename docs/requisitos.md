# Requisitos · Delivery 3001

Levantados pela turma no chat da Aula 6, quando trocamos a clínica pelo app de delivery. Requisito diz **o quê** o sistema faz. O **como** (linguagem, banco, tela) fica para o projeto.

## Requisitos funcionais

O sistema deve...

| ID | Requisito | Quem usa | Caso de uso |
|---|---|---|---|
| RF01 | permitir cadastro e login com e-mail e senha ou rede social | Cliente | UC-01 |
| RF02 | listar restaurantes por região e permitir filtrar por categoria | Cliente | UC-01 |
| RF03 | exibir o cardápio de cada restaurante | Cliente | UC-01 |
| RF04 | manter um carrinho com os itens escolhidos | Cliente | UC-02 |
| RF05 | aplicar cupons de desconto ao pedido | Cliente | UC-03 |
| RF06 | receber pagamento por cartão e Pix | Cliente, Gateway de pagamento | UC-04 |
| RF07 | usar a localização do cliente como endereço de entrega | Cliente | UC-02 |
| RF08 | mostrar o tempo estimado e acompanhar a entrega | Cliente | UC-05 |
| RF09 | permitir avaliar o pedido entregue | Cliente | UC-06 |
| RF10 | avisar o restaurante do novo pedido e deixá-lo atualizar o status | Restaurante | UC-07 |
| RF11 | oferecer a entrega a um entregador próximo e registrar a retirada | Entregador | UC-08 |

## Requisitos não funcionais

Dizem **como** o sistema deve se comportar. Quase todos viram teste de outro tipo.

| ID | Requisito | Vira que tipo de teste? |
|---|---|---|
| RNF01 | Confirmar o pedido em até 5 segundos mesmo no pico de sexta à noite | carga e estresse |
| RNF02 | Calcular preço e desconto no servidor, nunca confiando no valor que vem da tela | segurança |
| RNF03 | Mostrar datas e horários no fuso do cliente (Manaus tem uma hora a menos que Brasília) | sistema |
| RNF04 | Fazer um pedido completo em até 3 minutos, sem treinamento | usabilidade |
| RNF05 | Nenhum pedido pago pode ser perdido se o servidor cair | recuperação |

> Repare em RNF02: ele saiu de um caso de teste que o Jeferson propôs na Aula 6 (mexer no preço pelo inspetor do navegador). Às vezes o teste revela o requisito que faltava.
