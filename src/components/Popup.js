export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.showModal();
  }

  /**
   * Closes the open popup with a smooth transition.
   * @param {*} evt The closing event.
   */
  close(evt) {
    this._popup.setAttribute("closing", true);
    this._popup.addEventListener(
      "animationend",
      () => {
        this._popup.removeAttribute("closing");
        this._popup.close();
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

  setEventListeners() {
    const closeButton = this._popup.querySelector(".close-button");
    closeButton.addEventListener("click", (evt) => {
      this.close(evt);
    });

    this._popup.addEventListener("click", (evt) => {
      this.closeOnOutsideClick(evt);
    });
  }
}
