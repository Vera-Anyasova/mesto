export class FormValidator {
  constructor(settingForm, formElement) {
    this._formSelector = settingForm.formSelector;
    this._inputSelector = settingForm.inputSelector;
    this._submitButtonSelector = settingForm.submitButtonSelector;
    this._inactiveButtonClass = settingForm.inactiveButtonClass;
    this._inputErrorClass = settingForm.inputErrorClass;
    this._errorClass = settingForm.errorClass;
    this._formElement = formElement;
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

  _toggleFormButton(inputs, buttonElement) {
    if (this._hasInvalideInput(inputs)) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    }
  }

  _setEventListeners = () => {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleFormButton(inputs, buttonElement);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkformValidity(inputElement);
        this._toggleFormButton(inputs, buttonElement);
      });
    });
  };

  _hasInvalideInput(inputs) {
    return inputs.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      this._setEventListeners(formElement);
    });
  };
}
