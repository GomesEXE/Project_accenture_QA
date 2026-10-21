const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const webTablesPage = require("../../../support/pages/web-tables.page");

let record;

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
