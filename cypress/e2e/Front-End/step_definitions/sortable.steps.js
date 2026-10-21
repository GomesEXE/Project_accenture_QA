const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const sortablePage = require("../../../support/pages/sortable.page");

When("organizo a lista em ordem crescente usando drag and drop", () => {
  sortablePage.sortListAscending();
});

Then("os itens da lista devem estar em ordem crescente", () => {
  sortablePage.assertListAscending();
});
