class FormValidator {
  constructor(conf, formElement) {
    this._conf = conf;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._conf.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._conf.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._conf.inputErrorClass);
    errorElement.classList.remove(this._conf.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._conf.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._conf.inactiveButtonClass);
    }
  }

  _validateField(inputList, buttonElement, inputElement) {
    this._toggleButtonState(inputList, buttonElement);
    this._checkInputValidity(inputElement);
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._conf.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._conf.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._validateField(inputList, buttonElement, inputElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator };
