const showInputError = (formElement, inputElement, errorMessage, conf) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(conf.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(conf.errorClass);
};

const hideInputError = (formElement, inputElement, conf) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(conf.inputErrorClass);
  errorElement.classList.remove(conf.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, conf) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      conf
    );
  } else {
    hideInputError(formElement, inputElement, conf);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, conf) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(conf.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(conf.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, conf) => {
  const inputList = Array.from(
    formElement.querySelectorAll(conf.inputSelector)
  );
  const buttonElement = formElement.querySelector(conf.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, conf);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, conf);
      checkInputValidity(formElement, inputElement, conf);
    });
  });
};

const enableValidation = (conf) => {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, conf);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".input",
  submitButtonSelector: ".save-button",
  inactiveButtonClass: "save-button_inactive",
  inputErrorClass: "input_type_error",
  errorClass: "form__input-error_active",
});
