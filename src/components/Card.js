export class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteIconClick, handleLikeClick },
    templateSelector
  ) {
    this._text = data.name;
    this._imageLink = data.link;
    this._alt = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._ownerId = this._owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._photoElement = cardElement.querySelector(".element__photo");
    this._buttonLike = cardElement.querySelector(".element__like");
    this._buttonDelete = cardElement.querySelector(".element__btn-delete");
    this._likeCounter = cardElement.querySelector(".element__number");

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._text;
    this._photoElement.src = this._imageLink;
    this._photoElement.alt = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteIconClick(this._id);
    });

    this._photoElement.addEventListener("click", () => {
      this._handleCardClick(this._text, this._imageLink);
    });
  }

  checkMyId() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.classList.add("element__btn-delete_active");
    } else {
      this._buttonDelete.classList.remove("element__btn-delete_active");
    }
  }

  deleteButtonClick() {
    this._element.remove();
  }

  availableLikes = () => {
    const isMyLikes = this._likes.some((like) => like._id === this._userId);
    return isMyLikes;
  };

  toggleButtonLike() {
    if (this.availableLikes()) {
      this._buttonLike.classList.remove("element__like_active");
    } else {
      this._buttonLike.classList.add("element__like_active");
    }
  }

  countNewLike(newData) {
    this._likes = newData.likes;
    this._likeCounter.textContent = this._likes.length;
  }
}
