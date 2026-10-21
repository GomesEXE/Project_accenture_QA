const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const progressBarPage = require("../../../support/pages/progress-bar.page");

When("clico no botão Start", () => {
  progressBarPage.start();
});

When("paro a barra antes dos 25%", () => {
  progressBarPage.stopBefore25();
});

When("reinicio a barra, aguardo 100% e a reseto", () => {
  progressBarPage.completeAndReset();
});

Then("o valor da Progress Bar deve ser menor ou igual a 25%", () => {
  progressBarPage.assertValueAtMost25();
});
