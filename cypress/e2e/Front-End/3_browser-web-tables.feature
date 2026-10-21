Feature: Web Tables do DemoQA
  Como visitante do DemoQA
  Quero acessar a página de tabelas web

  Scenario: Acessar Web Tables
    Given que acesso a página inicial do DemoQA
    When seleciono Elements na página inicial
    And clico no submenu Web Tables
    And crio um novo registro
    And edito o novo registro criado
    When deleto o novo registro criado
    Then o novo registro deve estar excluido
