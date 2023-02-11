import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".form");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmDelete();
    });
    super.setEventListeners();
  }

  setSubmitConfirm(submitConfirm) {
    this._handleConfirmDelete = submitConfirm;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
