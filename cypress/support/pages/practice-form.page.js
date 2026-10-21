class PracticeFormPage {
  openPracticeForm() {
    cy.contains("a", "Practice Form").click();
    cy.location("pathname").should("equal", "/automation-practice-form");
    cy.contains("h1", "Practice Form").should("be.visible");
  }

  fillForm(studentData, birthDate, genderId, hobbyId) {
    cy.get("#firstName").type(studentData.firstName);
    cy.get("#lastName").type(studentData.lastName);
    cy.get("#userEmail").type(studentData.email);
    cy.get(`#gender-radio-${genderId}`).check({ force: true });
    cy.get("#userNumber").type(studentData.mobile);
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select(String(birthDate.getFullYear()));
    cy.get(".react-datepicker__month-select").select(String(birthDate.getMonth()));
    cy.get(
      `.react-datepicker__day--${String(birthDate.getDate()).padStart(3, "0")}:not(.react-datepicker__day--outside-month)`,
    ).click();
    cy.get("#subjectsInput").type(studentData.subject).type("{enter}");
    cy.get(`#hobbies-checkbox-${hobbyId}`).check({ force: true });
    cy.get("#uploadPicture").selectFile("cypress/fixtures/student-upload.txt", { force: true });
    cy.get("#currentAddress").type(studentData.address);
    cy.get("#state").click();
    cy.contains('[role="option"]', studentData.state).click();
    cy.get("#city").click();
    cy.contains('[role="option"]', studentData.city).click();
  }

  submit() {
    cy.get("#submit").scrollIntoView().click();
  }

  assertConfirmation(studentData) {
    cy.get(".modal-content").should("be.visible");
    cy.get("#example-modal-sizes-title-lg")
      .should("be.visible")
      .and("contain.text", "Thanks for submitting the form");
    cy.get(".modal-content").should("contain.text", `${studentData.firstName} ${studentData.lastName}`);
    cy.get(".modal-content").should("contain.text", studentData.email);
    cy.get(".modal-content").should("contain.text", studentData.fileName);
    cy.get(".modal-content").should("contain.text", studentData.state);
    cy.get(".modal-content").should("contain.text", studentData.city);
  }

  closePopup() {
    cy.get(".modal-backdrop").click("topLeft", { force: true });
  }

  assertPopupClosed() {
    cy.get(".modal-content").should("not.exist");
  }
}

module.exports = new PracticeFormPage();
