import { initialCards } from "./cards.js";
import { Card } from "./card.js";
import { validationSettings } from "./validationSettings.js";
import { FormValidator } from "./formValidator.js";

const popups = document.querySelectorAll(".popup");
const popupElementProfile = document.querySelector(".popup_profile");
const popupElementCard = document.querySelector(".popup_card");
const popupElementPhoto = document.querySelector(".popup_photo");
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".form-profile");
const formElementCard = document.querySelector(".form-card");
const nameInput = formEditProfile.querySelector(".form__item_theme_name");
const jobInput = formEditProfile.querySelector(".form__item_theme_job");
const titleInput = formElementCard.querySelector(".form__item_theme_title");
const linkInput = formElementCard.querySelector(".form__item_theme_link");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const elementPopupTitle = popupElementPhoto.querySelector(".popup__title");
const elementPopupPhoto = popupElementPhoto.querySelector(".popup__image");
const cardsElementList = document.querySelector(".elements__list");

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleKeyDown);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKeyDown);
};

// Закрытие попапа нажатием на Esc

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// Закрытие попапа кликом на оверлей и на крестик

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__button")
    ) {
      closePopup(popup);
    }
  });
});

// Форма редактирования профиля

buttonOpenEditProfilePopup.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupElementProfile);
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupElementProfile);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

// Добавляем карточку

function renderCard(item) {
  const card = new Card(item, "#template-cards", handleElementPhotoClick);
  const cardElement = card.generateCard();

  cardsElementList.prepend(cardElement);
}

initialCards.forEach(function (item) {
  renderCard(item, cardsElementList);
});

function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const cardElement = {
    name: titleInput.value,
    link: linkInput.value,
  };

  renderCard(cardElement, cardsElementList);
  closePopup(popupElementCard);
  evt.target.reset();
}

buttonOpenAddCardPopup.addEventListener("click", function () {
  openPopup(popupElementCard);
  formValidatorCard.disableSubmitButton();
});

formElementCard.addEventListener("submit", handleFormCardSubmit);

// Открытие попапа с картинкой

function handleElementPhotoClick(name, link) {
  elementPopupPhoto.src = link;
  elementPopupPhoto.alt = name;
  elementPopupTitle.textContent = name;

  openPopup(popupElementPhoto);
}

// Валидация форм

const formValidatorCard = new FormValidator(
  validationSettings,
  formElementCard
);
const formValidatorProfile = new FormValidator(
  validationSettings,
  formEditProfile
);

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
