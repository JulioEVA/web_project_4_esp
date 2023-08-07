import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callbackFunction, popupSelector) {
    super(popupSelector);
    this._submitForm = callbackFunction;
  }

  _getInputValues() {
    const inputFields = this._popup.querySelectorAll(".input");
    const inputValues = {};

    inputFields.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
  }

  close(evt) {
    super.close(evt);
    const placeInput = document.querySelector("#place-input");
    const linkInput = document.querySelector("#link-input");

    placeInput.value = "";
    linkInput.value = "";
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._popup.classList.value.includes("edit-popup")) {
      const editButton = document.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        this.open();
      });
    }

    if (this._popup.classList.value.includes("add-popup")) {
      const addButton = document.querySelector(".add-button");
      addButton.addEventListener("click", () => {
        this.open();
      });
    }

    if (this._popup.classList.value.includes("avatar-popup")) {
      const avatarButton = document.querySelector(".avatar-button");
      avatarButton.addEventListener("click", () => {
        this.open();
      });
    }

    const submitButton = this._popup.querySelector(".save-button");
    submitButton.addEventListener("click", (evt) => {
      this._submitForm(evt);
      this.renderLoading();
      evt.preventDefault();
    });
  }
}
