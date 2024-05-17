# API-contract-renegotiation
API que disponibiliza um método GET para verificar a possibilidade de renegociação de contrato de um usuário.

# Especificação do Método:
Endpoint: /verificar-renegociacao
Método: GET
Retorno: A API deve retornar um JSON indicando se o usuário está ou não elegível para renegociação.

# Regras de Negócio para Elegibilidade:
- Status do Contrato: O contrato deve estar ativo ("status": "ACTIVE").
- Atraso no Pagamento: O usuário deve ter pelo menos uma parcela com atraso superior a 30 dias a partir da data de vencimento.
  
# Saída Esperada:

A API verifica as condições acima e retorna { "eligible": true } se o usuário estiver elegível para renegociação, ou { "eligible": false } caso contrário.
