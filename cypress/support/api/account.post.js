const baseUrl = "https://demoqa.com/Account/v1";

function createUser(userName, password) {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/User`,
    body: {
      userName,
      password,
    },
  });
}

function generateToken(userName, password) {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/GenerateToken`,
    body: {
      userName,
      password,
    },
  });
}

function checkAuthorized(userName, password) {
  return cy.request({
    method: "POST",
    url: `${baseUrl}/Authorized`,
    body: {
      userName,
      password,
    },
  });
}

module.exports = {
  createUser,
  generateToken,
  checkAuthorized,
};
