const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const sortablePage = require("../../../support/pages/sortable.page");

When("organizo a lista em ordem crescente usando drag and drop", () => {
  sortablePage.sortListAscending();
});

When("organizo o grid em ordem crescente usando drag and drop", () => {
  sortablePage.sortGridAscending();
});

Then("os itens da lista devem estar em ordem crescente", () => {
  sortablePage.assertListAscending();
});

Then("os itens do grid devem estar em ordem crescente", () => {
  sortablePage.assertGridAscending();
});
