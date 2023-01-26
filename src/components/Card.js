export class Card {
  constructor({ item, handleCardClick }, templateSelector) {
    this._text = item.name;
    this._imageLink = item.link;
    this._alt = item.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._photoElement = cardElement.querySelector(".element__photo");
    this._buttonLike = cardElement.querySelector(".element__like");

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
      this._handleLikeButtonClick();
    });

    this._element
      .querySelector(".element__btn-delete")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._photoElement.addEventListener("click", () => {
      this._handleCardClick(this._text, this._imageLink);
    });
  }

  _handleLikeButtonClick() {
    this._buttonLike.classList.toggle("element__like_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }
}
