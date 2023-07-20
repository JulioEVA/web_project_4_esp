import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  /**
   * Shows a bigger version of the clicked image of the element.
   * @param {*} evt The click event
   */
  open(evt) {
    const imageTitle = document.querySelector(".image-popup__title");
    const image = document.querySelector(".image-popup__image");
    image.src = evt.target.src;
    imageTitle.textContent = evt.target.title;

    this._popup.showModal();
  }
}
