const baseUrl = "https://demoqa.com/BookStore/v1";

function addBooks(userId, token, isbns) {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/Books`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
    },
  });
}

module.exports = {
  addBooks,
};
