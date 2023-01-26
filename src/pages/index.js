import "./index.css";
import { initialCards } from "../utils/cards.js";
import { Card } from "../components/Card.js";
import { validationSettings } from "../utils/validationSettings.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import {
  profileName,
  profileJob,
  cardsElementList,
  formEditProfile,
  formElementCard,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  nameInput,
  jobInput,
} from "../utils/constants.js";

// Попап с картинкой

const popupWithImage = new PopupWithImage({ popupSelector: ".popup_photo" });
popupWithImage.setEventListeners();

const createCard = (item) => {
  const card = new Card(
    {
      item,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
    },
    "#template-cards"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item),
  },
  cardsElementList
);

cardList.renderItems();

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

// Форма редактирования профиля

const userInfo = new UserInfo({ userName: profileName, userJob: profileJob });

const handleEditProfilePopup = () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.userName;
  jobInput.value = data.userJob;
  popupEditProfile.open();
};

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  },
});

buttonOpenEditProfilePopup.addEventListener("click", () => {
  handleEditProfilePopup(profileName, profileJob);
});

popupEditProfile.setEventListeners();

// Форма создания карточки

const popupWithCard = new PopupWithForm({
  popupSelector: ".popup_card",
  handleFormSubmit: (cardElement) => {
    createCard(cardElement);
  },
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupWithCard.open();
  formValidatorCard.disableSubmitButton();
});

popupWithCard.setEventListeners();
