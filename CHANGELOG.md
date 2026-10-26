# Histórico de versões

Tudo o que mudou no Delivery 3001, versão por versão. A versão mais nova fica em cima.

Cada versão é uma **etiqueta (tag)** no histórico do repositório. Clicando em [Releases](https://github.com/idcesares/delivery-3001/releases) dá para ver exatamente o que estava em produção em cada uma.

## [Ainda não lançado]

(as mudanças aceitas que ainda não ganharam versão aparecem aqui)

## [v1.0.1] · 26/10/2026

Correção de defeito. Nada novo para o cliente: só o que já devia funcionar.

### Corrigido
- Chamado #1: pedido de exatamente R$ 50,00 agora recebe o desconto do cupom PRIMEIRA10 (a regra diz "a partir de R$ 50,00"; o código tratava R$ 50,00 como abaixo do mínimo)

### Ainda em aberto
- Chamados #2 a #5 e o desafio #6 (dois defeitos da Aula 6: frete dentro do desconto e teto de R$ 15 ausente)

## [v1.0.0] · 05/10/2026

Primeira versão em produção.

### Novo
- Cupom PRIMEIRA10 para o primeiro pedido (UC-03 Aplicar cupom)
- Robô de testes que roda os casos automatizados a cada mudança proposta
- Documentação de requisitos, casos de uso e casos de teste da turma
