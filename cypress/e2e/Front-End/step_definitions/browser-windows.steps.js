const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const browserWindowsPage = require("../../../support/pages/browser-windows.page");

When("clico no submenu Browser Windows", () => {
  browserWindowsPage.open();
});

When("clico no botão New Window", () => {
  browserWindowsPage.clickNewWindow();
});

Then("uma nova janela deve abrir com a mensagem de exemplo", () => {
  browserWindowsPage.assertNewWindowContent();
});

When("fecho a nova janela aberta", () => {
  browserWindowsPage.closeNewWindow();
});
