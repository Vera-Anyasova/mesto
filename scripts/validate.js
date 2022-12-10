const settingForm = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  settingForm
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingForm.errorClass);
};

const hideInputError = (formElement, inputElement, settingForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingForm.inputErrorClass);
  errorElement.classList.remove(settingForm.errorClass);
  errorElement.textContent = "";
};

const checkformValidity = (formElement, inputElement, settingForm) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settingForm
    );
  } else {
    hideInputError(formElement, inputElement, settingForm);
  }
};

const toggleFormButton = (inputs, buttonElement, settingForm) => {
  if (hasInvalideInput(inputs)) {
    buttonElement.classList.remove(settingForm.inactiveButtonClass);
  } else {
    buttonElement.classList.add(settingForm.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settingForm) => {
  const inputs = Array.from(
    formElement.querySelectorAll(settingForm.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settingForm.submitButtonSelector
  );

  toggleFormButton(inputs, buttonElement, settingForm);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkformValidity(formElement, inputElement, settingForm);
      toggleFormButton(inputs, buttonElement, settingForm);
    });
  });
};

const hasInvalideInput = (inputs) => {
  return inputs.every((inputElement) => {
    return inputElement.validity.valid;
  });
};

const enableValidation = (settingForm) => {
  const forms = Array.from(document.querySelectorAll(settingForm.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, settingForm);
  });
};

enableValidation(settingForm);
