Feature: Sortable do DemoQA
  Como visitante do DemoQA
  Quero acessar a funcionalidade Sortable

  
  Scenario: Acessar Sortable
    Given que acesso a página inicial do DemoQA
    When seleciono Interactions na página inicial
    And clico no submenu Sortable
    And organizo a lista em ordem crescente usando drag and drop
    Then os itens da lista devem estar em ordem crescente
    And organizo o grid em ordem crescente usando drag and drop
    And os itens do grid devem estar em ordem crescente
