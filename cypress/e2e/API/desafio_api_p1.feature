@api @regression_test
Feature: Gerenciamento de usuário na API Account
  Como consumidor da API DemoQA
  Quero criar e autenticar um usuário
  Para validar as operações da conta

  Background:
    Given que um usuário foi criado com sucesso para esta execução

  Scenario: 1. Criar um usuário
    When consulto a resposta do cadastro de usuário
    Then a API deve confirmar a criação do usuário

  Scenario: 2. Gerar um token de acesso
    When solicito um token de acesso para esse usuário
    Then a API deve retornar um token válido

  Scenario: 3. Confirmar que o usuário está autorizado
    When verifico a autorização desse usuário
    Then a API deve confirmar que o usuário está autorizado
    #Nao funciona sem o segundo cenario, pois o token é gerado no segundo cenário e não é persistido entre os cenários.

  Scenario: 4. Listar os livros disponíveis
    When consulto os livros disponíveis na livraria
    Then a API deve retornar a lista de livros disponíveis

  Scenario: 5. Alugar dois livros de livre escolha
    When alugo dois livros de livre escolha para esse usuário
    Then a API deve confirmar que os dois livros foram adicionados à conta

  Scenario: 6. Consultar os detalhes do usuário com os livros escolhidos
    When consulto os detalhes do usuário e seus livros
    Then a API deve retornar o usuário com os dois livros escolhidos
