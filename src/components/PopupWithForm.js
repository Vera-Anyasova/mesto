import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._button = this._popupElement.querySelector(".form__button");
  }

  _getInputValues() {
    this._inputs = this._popupElement.querySelectorAll(".form__item");
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  waitLoad(isReady) {
    if (isReady) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
