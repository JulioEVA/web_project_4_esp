import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const firstResult = 0;
const secondResult = 1;
const elements = document.querySelector(".elements");
const formElement = document.querySelector("form");
const modalTitle = document.querySelector(".edit-popup__title");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputs = document.querySelectorAll(".input");
const nameInput = inputs[firstResult];
const aboutInput = inputs[secondResult];
const elementTitle = nameInput;
const imageLink = aboutInput;
const modal = document.querySelector(".edit-popup");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

/**
 * Load elements on page startup.
 */
initialCards.forEach((item) => loadElement(item.name, item.link));

/**
 * Loads an element in the element section.
 *
 * @param {*} elementTitle The element's title.
 * @param {*} imageLink The element's image.
 */
function loadElement(elementTitle, imageLink) {
  const newCard = new Card(elementTitle, imageLink, ".element-template");
  elements.prepend(newCard.createCardElement());
}

/**
 * Handles the form submit for the profile case.
 * @param {*} evt The form's submit event.
 */
function handleProfileFormSubmit(evt) {
  if (modalTitle.textContent == "Nuevo lugar") {
    return;
  }
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  modal.close();
}

/**
 * Handles the form submit case for the element case.
 * @param {*} evt The form's submit event.
 */
function handleElementFormSubmit(evt) {
  if (modalTitle.textContent == "Editar perfil") {
    return;
  }
  evt.preventDefault();

  loadElement(elementTitle.value, imageLink.value);
  modal.close();
}

const formValidator = new FormValidator(
  {
    formSelector: ".form",
    inputSelector: ".input",
    submitButtonSelector: ".save-button",
    inactiveButtonClass: "save-button_inactive",
    inputErrorClass: "input_type_error",
    errorClass: "form__input-error_active",
  },
  formElement
);
formValidator.enableValidation();

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", handleElementFormSubmit);

export {
  modalTitle,
  profileName,
  profileSubtitle,
  nameInput,
  aboutInput,
  elementTitle,
  imageLink,
  secondResult,
  modal,
};
