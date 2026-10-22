@front @regression_test
Feature: Progress Bar do DemoQA
  Como visitante do DemoQA
  Quero acessar a barra de progresso

  Scenario: Acessar Progress Bar
    Given que acesso a página inicial do DemoQA
    When seleciono Widgets na página inicial
    And clico no submenu Progress Bar
    And clico no botão Start
    When paro a barra antes dos 25%
    Then o valor da Progress Bar deve ser menor ou igual a 25%
    And reinicio a barra, aguardo 100% e a reseto
