Feature: Browser Windows do DemoQA
  Como visitante do DemoQA
  Quero abrir e validar uma nova janela do navegador

  Scenario: Abrir e fechar uma nova janela
    Given que acesso a página inicial do DemoQA
    When seleciono Alerts, Frame & Windows na página inicial
    And clico no submenu Browser Windows
    And clico no botão New Window
    Then uma nova janela deve abrir com a mensagem de exemplo
    When fecho a nova janela aberta
