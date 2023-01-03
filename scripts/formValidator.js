export class FormValidator {
  constructor(validationSettings, formElement, inputs, buttonElement) {
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._formElement = formElement;
    this._inputs = inputs;
    this._buttonElement = buttonElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(errorElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkformValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  __toggleFormButonState() {
    if (this._hasInvalideInput()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    } else {
      this.disableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _setEventListeners = () => {
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this.__toggleFormButonState();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkformValidity(inputElement);
        this.__toggleFormButonState();
      });
    });
  };

  _hasInvalideInput() {
    return this._inputs.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  enableValidation = () => {
    const formElement = document.querySelector(this._formSelector);
    this._setEventListeners(formElement);
  };
}
