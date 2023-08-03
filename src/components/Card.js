export default class Card {
  constructor(
    title,
    link,
    likes,
    templateSelector,
    handleCardClick,
    handleDelete
  ) {
    this._title = title;
    this._likes = likes;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
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
    const newElementLikeCounter = newElement.querySelector(".like-counter");

    newElementImage.title = this._title;
    newElementImage.src = this._link;
    newElementTitle.textContent = this._title;
    newElementLikeCounter.textContent = this._likes.length;
    this._newElement = newElement;
    this._createEventListeners();
    return newElement;
  }

  /**
   * Toggles the "like_active" class.
   * @param {*} evt The click event.
   */
  _handleLike(evt) {
    evt.target.classList.toggle("like_active");
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
    elementImage.addEventListener("click", this._handleCardClick);
  }
}
