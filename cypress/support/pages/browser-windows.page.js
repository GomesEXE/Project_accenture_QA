class BrowserWindowsPage {
  open() {
    cy.contains("span", "Browser Windows").click();
    cy.location("pathname").should("equal", "/browser-windows");
  }

  clickNewWindow() {
    cy.window().then((window) => {
      cy.stub(window, "open").as("newWindow");
    });
    cy.get("#windowButton").click();
  }

  assertNewWindowContent() {
    cy.get("@newWindow")
      .should("have.been.calledOnce")
      .then((newWindow) => {
        const newWindowUrl = newWindow.getCall(0).args[0];
        expect(newWindowUrl).to.include("/sample");
        cy.location("origin").then((origin) => {
          cy.visit(new URL(newWindowUrl, origin).toString());
        });
      });
    cy.get("#sampleHeading").should("have.text", "This is a sample page");
  }

  closeNewWindow() {
    cy.go("back");
    cy.location("pathname").should("equal", "/browser-windows");
  }
}

module.exports = new BrowserWindowsPage();
