const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const webTablesPage = require("../../../support/pages/web-tables.page");

let record;
let records;

When("crio um novo registro", () => {
  const recordId = `${Date.now()}`;
  record = {
    firstName: "QA",
    lastName: `Tester${recordId.slice(-5)}`,
    email: `qa${recordId}@example.com`,
    age: "30",
    salary: "50000",
    department: "Quality Assurance",
  };

  webTablesPage.createRecord(record);
});

When("edito o novo registro criado", () => {
  record.department = "Quality Assurance Updated";
  webTablesPage.editRecord(record);
});

When("deleto o novo registro criado", () => {
  webTablesPage.deleteRecord(record);
});

Then("o novo registro deve estar excluido", () => {
  webTablesPage.assertRecordDeleted(record);
});

When("crio 12 novos registros de forma dinâmica", () => {
  const recordId = Date.now();
  records = Array.from({ length: 12 }, (_, index) => ({
    firstName: "QA",
    lastName: `Batch${recordId}${index}`,
    email: `qa-batch-${recordId}-${index}@example.com`,
    age: "30",
    salary: "50000",
    department: "Quality Assurance",
  }));

  webTablesPage.showTwentyRecords();
  cy.wrap(records).each((newRecord) => webTablesPage.createRecord(newRecord));
  cy.wrap(records).each((newRecord) => {
    cy.contains("tr", newRecord.lastName).should("exist");
  });
});

When("deleto todos os novos registros criados", () => {
  cy.wrap(records).each((newRecord) =>
    cy.get("body").then(($body) => {
      if ($body.text().includes(newRecord.lastName)) {
        return webTablesPage.deleteRecord(newRecord);
      }
    }),
  );
});

Then("todos os novos registros devem estar excluidos", () => {
  cy.wrap(records).each((newRecord) => webTablesPage.assertRecordDeleted(newRecord));
});
