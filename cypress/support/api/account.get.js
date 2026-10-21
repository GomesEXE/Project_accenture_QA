const baseUrl = "https://demoqa.com/Account/v1";

function getUser(userId, token) {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = {
  getUser,
};
