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

  Scenario: Criar e deletar 12 registros dinamicamente
    Given que acesso a página inicial do DemoQA
    When seleciono Elements na página inicial
    And clico no submenu Web Tables
    And crio 12 novos registros de forma dinâmica
    And deleto todos os novos registros criados
    Then todos os novos registros devem estar excluidos


#lembrar dos examples na linguagem cucumber ultilizando o foreach

