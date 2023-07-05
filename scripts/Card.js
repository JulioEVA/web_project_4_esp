class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  /**
   * Creates a Card element with the given title, image link and
   * template selector.
   * @returns A Card element with all the required info.
   */
  createCardElement() {
    const elementTemplate = document.querySelector(
      this._templateSelector
    ).content;
    const newElement = elementTemplate
      .querySelector(".element")
      .cloneNode(true);
    const newElementImage = newElement.querySelector(".element__image");
    const newElementTitle = newElement.querySelector(".element__title");

    newElementImage.title = this._title;
    newElementImage.src = this._link;
    newElementTitle.textContent = this._title;
    this._newElement = newElement;
    this._createEventListeners();
    return newElement;
  }

  /**
   * Deletes the element on which the delete button was clicked.
   * @param {*} evt The click event.
   */
  _handleDelete(evt) {
    evt.target.closest(".element").remove();
  }

  /**
   * Toggles the "like_active" class.
   * @param {*} evt The click event.
   */
  _handleLike(evt) {
    evt.target.classList.toggle("like_active");
  }

  /**
   * Shows a bigger version of the clicked image of the element.
   * @param {*} evt The click event
   */
  _handleImageClick(evt) {
    const imageTitle = document.querySelector(".image-popup__title");
    const image = document.querySelector(".image-popup__image");
    image.src = evt.target.src;
    imageTitle.textContent = evt.target.title;
    const imagePopup = document.querySelector(".image-popup");
    imagePopup.showModal();
  }

  /**
   * Creates each individual listener for each card component.
   */
  _createEventListeners() {
    const btnDelete = this._newElement.querySelector(".delete-button");
    btnDelete.addEventListener("click", this._handleDelete);

    const btnLike = this._newElement.querySelector(".like");
    btnLike.addEventListener("click", this._handleLike);

    const elementImage = this._newElement.querySelector(".element__image");
    elementImage.addEventListener("click", this._handleImageClick);
  }
}

export { Card };
