const baseUrl = "https://demoqa.com/BookStore/v1";

function listBooks() {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/Books`,
  });
}

module.exports = {
  listBooks,
};
