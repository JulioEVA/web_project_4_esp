export default class FormValidator {
  constructor(conf, formList) {
    this._conf = conf;
    this._formList = formList;
  }

  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._conf.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._conf.errorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._conf.inputErrorClass);
    errorElement.classList.remove(this._conf.errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._conf.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._conf.inactiveButtonClass);
    }
  }

  validateField(inputList, buttonElement, inputElement, formElement) {
    this.toggleButtonState(inputList, buttonElement);
    this.checkInputValidity(formElement, inputElement);
  }

  setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._conf.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this._conf.submitButtonSelector
    );
    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.validateField(inputList, buttonElement, inputElement, formElement);
      });
    });
  }

  enableValidation() {
    this._formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      this.setEventListeners(formElement);
    });
  }
}
