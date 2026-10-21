class HomePage {
  visit() {
    cy.visit("https://demoqa.com/");
  }

  selectForms() {
    cy.contains("a", "Forms").click();
    cy.location("pathname").should("equal", "/forms");
  }

  selectElements() {
    cy.contains("h5", "Elements").click();
    cy.location("pathname").should("equal", "/elements");
  }

  selectWidgets() {
    cy.contains("h5", "Widgets").click();
    cy.location("pathname").should("equal", "/widgets");
  }

  selectInteractions() {
    cy.contains("h5", "Interactions").click();
    cy.location("pathname").should("equal", "/interaction");
  }

  selectAlertsFrameWindows() {
    cy.contains("h5", "Alerts, Frame & Windows").click();
    cy.location("pathname").should("equal", "/alertsWindows");
  }

  openWebTables() {
    cy.contains("span", "Web Tables").click();
    cy.location("pathname").should("equal", "/webtables");
  }

  openProgressBar() {
    cy.contains("span", "Progress Bar").click();
    cy.location("pathname").should("equal", "/progress-bar");
  }

  openSortable() {
    cy.contains("span", "Sortable").click();
    cy.location("pathname").should("equal", "/sortable");
  }
}

module.exports = new HomePage();
