import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector(".save-button");
    submitButton.addEventListener("click", (evt) => {
      evt.target.closest(".element").remove();
      evt.preventDefault();
    });
  }
}
