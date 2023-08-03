import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

const formList = Array.from(document.querySelectorAll(".form"));
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#about-input");
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_07",
  headers: {
    authorization: "07941066-0302-4776-b982-c4274dd7ce77",
  },
});
let initialCards = [];
await api.getInitialCards().then((cards) => {
  initialCards = cards;
});
const section = new Section(
  { items: initialCards, renderer: loadElement },
  ".elements"
);
const addPopup = new PopupWithForm(handleElementFormSubmit, ".add-popup");
const editPopup = new PopupWithForm(handleProfileFormSubmit, ".edit-popup");
const userInfo = new UserInfo({
  userName: "",
  userJob: "",
});

await api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user.name, user.about);
});
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
