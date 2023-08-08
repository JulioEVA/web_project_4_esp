export default class Card {
  constructor(
    title,
    link,
    likes = [],
    owner,
    _id,
    templateSelector,
    handleCardClick,
    handleDelete,
    handleLike,
    handleDislike
  ) {
    this._title = title;
    this._likes = likes;
    this._link = link;
    this._owner = owner;
    this._id = _id;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._myId = "75edee5246fd7a972acf552a";
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
    const newElementDeleteButton = newElement.querySelector(".delete-button");
    const newElementLikeButton = newElement.querySelector(".like");

    newElement.id = this._id;
    newElementImage.title = this._title;
    newElementImage.src = this._link;
    newElementTitle.textContent = this._title;

    if (this._owner._id != this._myId) {
      newElementDeleteButton.classList.toggle("delete-button_inactive");
    }

    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        newElementLikeButton.classList.toggle("like_active");
        this._isLiked = true;
      }
    });

    newElementLikeCounter.textContent = this._likes.length;
    this._newElement = newElement;
    this._createEventListeners();
    return newElement;
  }

  /**
   * Changes the like button appearance and the card's isLiked property.
   * @param {*} evt The click event
   * @param {*} isLiked The new value of the isLiked Card's property
   */
  _changeLikeStatus(evt, isLiked) {
    evt.target.classList.toggle("like_active");
    this._isLiked = isLiked;
  }

  /**
   * Creates each individual listener for each card component.
   */
  _createEventListeners() {
    const btnDelete = this._newElement.querySelector(".delete-button");
    btnDelete.addEventListener("click", () => {
      this._handleDelete(this._id);
    });

    const btnLike = this._newElement.querySelector(".like");
    btnLike.addEventListener("click", (evt) => {
      if (!this._isLiked) {
        this._handleLike(this._id);
        this._changeLikeStatus(evt, true);
      } else {
        this._handleDislike(this._id);
        this._changeLikeStatus(evt, false);
      }
    });

    const elementImage = this._newElement.querySelector(".element__image");
    elementImage.addEventListener("click", this._handleCardClick);
  }
}
