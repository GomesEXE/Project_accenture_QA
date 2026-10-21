const { Given, When, Then, Before } = require("@badeball/cypress-cucumber-preprocessor");
const accountGetApi = require("../../../support/api/account.get");
const accountPostApi = require("../../../support/api/account.post");
const bookStoreGetApi = require("../../../support/api/bookstore.get");
const bookStorePostApi = require("../../../support/api/bookstore.post");

const password = "Test@1234";
const userName = `qa_user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

let createUserResponse;
let apiResponse;
let rentedBooks;
let accessToken;

function logApiResponse(title, response) {
  cy.log(`${title} | HTTP ${response.status} | ${JSON.stringify(response.body)}`);
  console.group(`📡 ${title}`);
  console.log("Status HTTP:", response.status);
  console.log("Tempo de resposta:", `${response.duration} ms`);
  console.log("Corpo da resposta:", response.body);
  console.groupEnd();
}

Before("@api", () => {
  if (createUserResponse) {
    return;
  }

  cy.log("🚀 Criando usuário compartilhado pelos cenários de conta");
  accountPostApi.createUser(userName, password).then((response) => {
    createUserResponse = response;
    logApiResponse("Criação de usuário", response);
  });
});

Given("que um usuário foi criado com sucesso para esta execução", () => {
  expect(createUserResponse, "resposta da criação do usuário").to.exist;
});

When("consulto a resposta do cadastro de usuário", () => {
  apiResponse = createUserResponse;
});

Then("a API deve confirmar a criação do usuário", () => {
  expect(apiResponse.status).to.equal(201);
  expect(apiResponse.body).to.have.property("userID").that.is.a("string").and.not.empty;
  expect(apiResponse.body.username).to.equal(userName);
  expect(apiResponse.body.books).to.be.an("array").that.is.empty;
});

When("solicito um token de acesso para esse usuário", () => {
  cy.log("🔐 Solicitando token para o usuário compartilhado");
  return accountPostApi.generateToken(userName, password).then((response) => {
    apiResponse = response;
    logApiResponse("Geração de token", response);
  });
});

Then("a API deve retornar um token válido", () => {
  expect(apiResponse.status).to.equal(200);
  expect(apiResponse.body.token).to.be.a("string").and.not.empty;
  expect(apiResponse.body.status).to.equal("Success");
});

When("verifico a autorização desse usuário", () => {
  cy.log("🛡️ Verificando autorização do usuário compartilhado");
  return accountPostApi.checkAuthorized(userName, password).then((response) => {
    apiResponse = response;
    logApiResponse("Verificação de autorização", response);
  });
});

Then("a API deve confirmar que o usuário está autorizado", () => {
  expect(apiResponse.status).to.equal(200);
  expect(apiResponse.body).to.equal(true);
});

When("consulto os livros disponíveis na livraria", () => {
  cy.log("📚 Consultando os livros disponíveis");
  return bookStoreGetApi.listBooks().then((response) => {
    apiResponse = response;
    logApiResponse("Listagem de livros", response);
  });
});

Then("a API deve retornar a lista de livros disponíveis", () => {
  expect(apiResponse.status).to.equal(200);
  expect(apiResponse.body).to.have.property("books").that.is.an("array").and.not.empty;
  apiResponse.body.books.forEach((book) => {
    expect(book).to.have.property("isbn").that.is.a("string").and.not.empty;
    expect(book).to.have.property("title").that.is.a("string").and.not.empty;
    expect(book).to.have.property("author").that.is.a("string").and.not.empty;
  });
});

When("alugo dois livros de livre escolha para esse usuário", () => {
  cy.log("📚 Selecionando dois livros disponíveis para o usuário");
  return bookStoreGetApi.listBooks().then((booksResponse) => {
    logApiResponse("Consulta de livros para seleção", booksResponse);
    expect(booksResponse.body.books, "livros disponíveis para seleção").to.have.length.at.least(2);
    rentedBooks = booksResponse.body.books.slice(0, 2);
    //melhoria para selecionar dois livros aleatórios

    cy.log("🔐 Gerando token para adicionar os livros à conta");
    return accountPostApi.generateToken(userName, password).then((tokenResponse) => {
      logApiResponse("Geração de token para adicionar livros", tokenResponse);
      expect(tokenResponse.body.token).to.be.a("string").and.not.empty;
      accessToken = tokenResponse.body.token;

      const userId = createUserResponse.body.userID;
      const isbns = rentedBooks.map((book) => book.isbn);
      cy.log(`📖 Adicionando livros com ISBN: ${isbns.join(", ")}`);

      return bookStorePostApi.addBooks(userId, accessToken, isbns).then((response) => {
        apiResponse = response;
        logApiResponse("Adição de livros à conta", response);
      });
    });
  });
});

Then("a API deve confirmar que os dois livros foram adicionados à conta", () => {
  expect(apiResponse.status).to.equal(201);
  expect(apiResponse.body.books).to.have.length(2);

  const addedIsbns = apiResponse.body.books.map((book) => book.isbn);
  expect(addedIsbns).to.deep.equal(rentedBooks.map((book) => book.isbn));
});

When("consulto os detalhes do usuário e seus livros", () => {
  const userId = createUserResponse.body.userID;
  cy.log(`🔎 Consultando detalhes do usuário ${userId}`);
  return accountGetApi.getUser(userId, accessToken).then((response) => {
    apiResponse = response;
    logApiResponse("Detalhes do usuário", response);
  });
});

Then("a API deve retornar o usuário com os dois livros escolhidos", () => {
  expect(apiResponse.status).to.equal(200);
  expect(apiResponse.body.userId).to.equal(createUserResponse.body.userID);
  expect(apiResponse.body.username).to.equal(userName);
  expect(apiResponse.body.books).to.be.an("array").with.length(2);

  const userBookIsbns = apiResponse.body.books.map((book) => book.isbn);
  expect(userBookIsbns).to.have.members(rentedBooks.map((book) => book.isbn));
});
