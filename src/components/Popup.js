export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  // Закрытие попапа нажатием на Esc

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close(document.querySelector(".popup_opened"));
    }
  };

  // Закрытие попапа кликом на оверлей и на крестик

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__button")
      ) {
        this.close();
      }
    });
  }
}
