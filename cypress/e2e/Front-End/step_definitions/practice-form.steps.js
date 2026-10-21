const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const practiceFormPage = require("../../../support/pages/practice-form.page");

let studentData;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomDigits(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

When("acesso o submenu Practice Form", () => {
  practiceFormPage.openPracticeForm();
});

When("preencho todo o formulário com valores aleatórios", () => {
  const firstName = `QA${randomDigits(5)}`;
  const lastName = `Tester${randomDigits(4)}`;
  const email = `student${Date.now()}${randomDigits(3)}@example.com`;
  const gender = randomItem([
    { name: "Male", id: 1 },
    { name: "Female", id: 2 },
    { name: "Other", id: 3 },
  ]);
  const mobile = `${Math.floor(1 + Math.random() * 9)}${randomDigits(9)}`;
  const birthDate = new Date(
    1985 + Math.floor(Math.random() * 18),
    Math.floor(Math.random() * 12),
    1 + Math.floor(Math.random() * 28),
  );
  const birthDateText = birthDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const subject = randomItem(["Maths", "English", "Physics", "Chemistry", "Biology"]);
  const hobby = randomItem([
    { name: "Sports", id: 1 },
    { name: "Reading", id: 2 },
    { name: "Music", id: 3 },
  ]);
  const location = randomItem([
    { state: "NCR", city: "Delhi" },
    { state: "Uttar Pradesh", city: "Agra" },
    { state: "Haryana", city: "Karnal" },
  ]);
  const address = `Rua QA, ${randomDigits(4)}, Centro`;

  studentData = {
    firstName,
    lastName,
    email,
    gender: gender.name,
    mobile,
    birthDateText,
    subject,
    hobby: hobby.name,
    fileName: "student-upload.txt",
    address,
    state: location.state,
    city: location.city,
  };

  practiceFormPage.fillForm(studentData, birthDate, gender.id, hobby.id);
});

When("envio o formulário", () => {
  practiceFormPage.submit();
});

Then("um popup deve ser exibido com os dados enviados", () => {
  practiceFormPage.assertConfirmation(studentData);
});

When("fecho o popup", () => {
  practiceFormPage.closePopup();
});

Then("o popup deve ser fechado", () => {
  practiceFormPage.assertPopupClosed();
});
