const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../../../support/pages/home.page");

Given("que acesso a página inicial do DemoQA", () => {
  homePage.visit();
});

When("seleciono Forms na página inicial", () => {
  homePage.selectForms();
});

When("seleciono Elements na página inicial", () => {
  homePage.selectElements();
});

When("seleciono Widgets na página inicial", () => {
  homePage.selectWidgets();
});

When("seleciono Interactions na página inicial", () => {
  homePage.selectInteractions();
});

When("seleciono Alerts, Frame & Windows na página inicial", () => {
  homePage.selectAlertsFrameWindows();
});

When("clico no submenu Web Tables", () => {
  homePage.openWebTables();
});

When("clico no submenu Progress Bar", () => {
  homePage.openProgressBar();
});

When("clico no submenu Sortable", () => {
  homePage.openSortable();
});
