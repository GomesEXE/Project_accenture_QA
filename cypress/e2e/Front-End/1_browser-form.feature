@front @regression_test
Feature: Practice Form do DemoQA
  Como visitante do DemoQA
  Quero preencher e enviar o formulário de cadastro
  Para validar o envio e o popup de confirmação

  Scenario: Preencher o formulário com dados aleatórios e fechar o popup
    Given que acesso a página inicial do DemoQA
    When seleciono Forms na página inicial
    And acesso o submenu Practice Form
    And preencho todo o formulário com valores aleatórios
    And envio o formulário
    Then um popup deve ser exibido com os dados enviados
    When fecho o popup
    Then o popup deve ser fechado
