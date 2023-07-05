import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
const btnAdd = document.querySelector(".add-button");
const btnCloseImagePopup = document.querySelectorAll(".close-button")[1];
const imagePopup = document.querySelector(".image-popup");
const modal = document.querySelector(".edit-popup");
const modalButton = document.querySelector(".save-button");
const modalTitle = document.querySelector(".edit-popup__title");
const profileName = document.querySelector(".profile__title");
const formElement = document.querySelector("form");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputs = document.querySelectorAll(".input");
const firstInput = 0;
const secondInput = 1;
const elements = document.querySelector(".elements");
const nameInput = inputs[firstInput];
const aboutInput = inputs[secondInput];
const elementTitle = nameInput;
const imageLink = aboutInput;
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
 * Opens edit modal
 */
function openModalEdit(evt) {
  modalTitle.textContent = "Editar perfil";
  modalButton.textContent = "Guardar";
  nameInput.placeholder = "Nombre";
  aboutInput.placeholder = "Acerca de mí";
  aboutInput.maxlength = "200";
  aboutInput.type = "text";
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
  modal.showModal();
}
/**
 * Closes the open popup with a smooth transition.
 * @param {*} evt The closing event.
 * @param {*} popup The popup itself.
 */
function closePopup(evt, popup) {
  popup.setAttribute("closing", true);
  popup.addEventListener(
    "animationend",
    () => {
      popup.removeAttribute("closing");
      popup.close();
    },
    { once: true }
  );
  evt.preventDefault;
}

/**
 * Closes de edit modal.
 */
function closeModal(evt) {
  closePopup(evt, modal);
}

/**
 * Closes the open image.
 */
function closeImagePopup(evt) {
  closePopup(evt, imagePopup);
}

/**
 * Opens the modal to add a new element.
 * @param {*} evt The form submit element.
 */
function openAddModal(evt) {
  modalTitle.textContent = "Nuevo lugar";
  modalButton.textContent = "Crear";
  elementTitle.placeholder = "Título";
  imageLink.placeholder = "Enlace a la imagen";
  nameInput.value = "";
  aboutInput.value = "";
  aboutInput.removeAttribute("maxlength");
  aboutInput.type = "url";
  modal.showModal();
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

function closeOnOutsideClick(evt) {
  if (evt.target === modal || evt.target === imagePopup) {
    closePopup(evt, evt.target);
  }
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

modal.addEventListener("click", closeOnOutsideClick);
imagePopup.addEventListener("click", closeOnOutsideClick);

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", handleElementFormSubmit);

btnCloseImagePopup.addEventListener("click", closeImagePopup);
btnAdd.addEventListener("click", openAddModal);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModal);
