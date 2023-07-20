import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const formList = Array.from(document.querySelectorAll(".form"));
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");
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
const section = new Section(
  { items: initialCards, renderer: loadElement },
  ".elements"
);
const addPopup = new PopupWithForm(handleElementFormSubmit, ".add-popup");
const editPopup = new PopupWithForm(handleProfileFormSubmit, ".edit-popup");

const userInfo = new UserInfo({
  userName: profileName.textContent,
  userJob: profileSubtitle.textContent,
});

userInfo.setUserInfo(profileName.textContent, profileSubtitle.textContent);
section.renderItems();

/**
 * Loads an element in the element section.
 *
 * @param {*} elementTitle The element's title.
 * @param {*} imageLink The element's image.
 */
function loadElement({ name, link }) {
  const newCard = new Card(name, link, ".element-template", (evt) => {
    const imagePopup = new PopupWithImage(".image-popup");
    imagePopup.setEventListeners();
    imagePopup.open(evt);
  });
  section.addItem(newCard.createCardElement());
}

/**
 * Handles the form submit for the profile case.
 * @param {*} evt The form's submit event.
 */
function handleProfileFormSubmit(evt) {
  userInfo.setUserInfo(nameInput.value, aboutInput.value);
  editPopup.close(evt);
}

/**
 * Handles the form submit case for the element case.
 * @param {*} evt The form's submit event.
 */
function handleElementFormSubmit(evt) {
  const inputValues = addPopup._getInputValues();
  loadElement({
    name: inputValues["place-input"],
    link: inputValues["link-input"],
  });
  addPopup.close(evt);
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
  formList
);
formValidator.enableValidation();
addPopup.setEventListeners();
editPopup.setEventListeners();

export { profileName, profileSubtitle, nameInput, aboutInput };
