import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(id, popupSelector, deleteMethod) {
    super(popupSelector);
    this._confirmDelete = deleteMethod;
    this._id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    const submitButton = this._popup.querySelector(".save-button");
    submitButton.addEventListener("click", () => {
      this._confirmDelete(this._id);
      this.renderLoading();
    });
  }
}
