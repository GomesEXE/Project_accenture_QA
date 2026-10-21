class ProgressBarPage {
  start() {
    cy.get("#startStopButton").should("have.text", "Start").click();
    cy.get("#startStopButton").should("have.text", "Stop");
  }

  stopBefore25() {
    cy.get("#progressBar .progress-bar").should(($progressBar) => {
      const value = Number($progressBar.attr("aria-valuenow"));
      expect(value).to.be.within(15, 22);
    });
    cy.get("#startStopButton").should("have.text", "Stop").click();
    cy.get("#startStopButton").should("have.text", "Start");
  }

  assertValueAtMost25() {
    cy.get("#progressBar .progress-bar").should(($progressBar) => {
      const value = Number($progressBar.attr("aria-valuenow"));
      expect(value).to.be.at.most(25);
    });
  }

  completeAndReset() {
    cy.get("#startStopButton").should("have.text", "Start").click();
    cy.get("#progressBar .progress-bar", { timeout: 25000 }).should("have.attr", "aria-valuenow", "100");
    cy.contains("button", "Reset").click();
    cy.get("#startStopButton").should("have.text", "Start");
  }
}

module.exports = new ProgressBarPage();
