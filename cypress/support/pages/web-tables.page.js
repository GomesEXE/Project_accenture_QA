class WebTablesPage {
  createRecord(record) {
    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(record.firstName);
    cy.get("#lastName").type(record.lastName);
    cy.get("#userEmail").type(record.email);
    cy.get("#age").type(record.age);
    cy.get("#salary").type(record.salary);
    cy.get("#department").type(record.department);
    cy.get("#submit").click();

    cy.get("body").should("contain.text", record.lastName);
  }

  editRecord(record) {
    this.findRecordRow(record).within(() => {
      cy.get('[title="Edit"]').click({ force: true });
    });
    cy.get("#department").clear().type(record.department);
    cy.get("#submit").click();
    cy.get("body")
      .should("contain.text", record.lastName)
      .and("contain.text", record.department);
  }

  deleteRecord(record) {
    this.findRecordRow(record).within(() => {
      cy.get('[title="Delete"]').click({ force: true });
    });
  }

  assertRecordDeleted(record) {
    cy.get("body").should("not.contain.text", record.lastName);
  }

  findRecordRow(record) {
    return cy.contains(record.lastName).then(($cell) => {
      const $row = $cell.parents().filter((_, element) => element.querySelector('[title="Edit"]')).first();
      expect($row, "linha do registro com ação de edição").to.have.length(1);
      return cy.wrap($row);
    });
  }
}

module.exports = new WebTablesPage();
