export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector(".save-button");
  }

  open() {
    this._popup.showModal();
  }

  /**
   * Closes the open popup with a smooth transition.
   */
  close() {
    this._popup.setAttribute("closing", true);
    this._popup.addEventListener(
      "animationend",
      () => {
        this._popup.removeAttribute("closing");
        this._popup.close();
        this._submitButton.textContent = "Guardar";
      },
      { once: true }
    );
  }

  /**
   * Closes the popup window when clicking outside.
   *
   * @param {*} evt The click event.
   */
  closeOnOutsideClick(evt) {
    if (evt.target === this._popup) {
      this.close(evt);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(evt);
    }
  }

  renderLoading() {
    this._submitButton.textContent = "Guardando...";
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".close-button");
    closeButton.addEventListener("click", (evt) => {
      this.close(evt);
    });

    this._popup.addEventListener("click", (evt) => {
      this.closeOnOutsideClick(evt);
    });

    this._popup.addEventListener("keypress", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
