export class Card {
  constructor(item, templateSelector, handleElementPhotoClick) {
    this._text = item.name;
    this._image = item.link;
    this._alt = item.name;
    this._templateSelector = templateSelector;
    this._handleElementPhotoClick = handleElementPhotoClick;
  }

  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__photo").src = this._image;
    this._element.querySelector(".element__photo").alt = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._handleLikeButtonClick(evt);
      });

    this._element
      .querySelector(".element__btn-delete")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleElementPhotoClick(this._text, this._image);
      });
  }

  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }
}
