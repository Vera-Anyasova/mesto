import "./index.css";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { validationSettings } from "../utils/validationSettings.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation";
import { Section } from "../components/Section.js";
import {
  profileName,
  profileJob,
  cardsElementList,
  formEditProfile,
  formEditAvatar,
  formElementCard,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  profileAvatar,
  buttonEditAvatar,
} from "../utils/constants.js";
let userId;

// Попап с картинкой

const popupWithImage = new PopupWithImage({ popupSelector: ".popup_photo" });
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  name: profileName,
  about: profileJob,
  avatar: profileAvatar,
});

// Попап удаления

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: ".popup_delete",
});

// Создание карточки

const createCard = (data) => {
  const card = new Card(
    {
      data,
      userId: userId,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleDeleteIconClick: () => {
        popupWithConfirmation.open();
        popupWithConfirmation.setSubmitConfirm(() => {
          api
            .deleteCard(data._id)
            .then((res) => {
              card.deleteButtonClick(res);
              popupWithConfirmation.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      handleLikeClick: (id) => {
        if (card.availableLikes()) {
          api
            .deleteLike(id)
            .then((res) => {
              card.toggleButtonLike();
              card.countNewLike(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .addLike(id)
            .then((res) => {
              card.toggleButtonLike();
              card.countNewLike(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#template-cards"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  card.checkMyId();
};

const cardList = new Section(
  { renderer: (item) => createCard(item) },
  cardsElementList
);

popupWithConfirmation.setEventListeners();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-59/",
  headers: {
    authorization: "74800d66-2759-46e7-b69c-69709c21a575",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserIfnoApi(), api.getInitialCards()])
  .then((res) => {
    const resUser = res[0];
    const resCard = res[1];
    userId = resUser._id;
    userInfo.setUserInfo(resUser);
    cardList.renderItems(resCard);
  })
  .catch((err) => {
    console.log(err);
  });

// Форма редактирования профиля

const handleEditProfilePopup = () => {
  const data = userInfo.getUserInfo();
  popupEditProfile.setInputValues(data);
  popupEditProfile.open();
  formValidatorProfile.resetValidation();
};

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmit: (name, about) => {
    popupEditProfile.waitLoad(true);
    api
      .sendUserIfno(name, about)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.waitLoad(false);
      });
  },
});

buttonOpenEditProfilePopup.addEventListener("click", () => {
  handleEditProfilePopup(profileName, profileJob);
});

popupEditProfile.setEventListeners();

// Форма создания карточки

const popupWithCard = new PopupWithForm({
  popupSelector: ".popup_card",
  handleFormSubmit: (name, link) => {
    popupWithCard.waitLoad(true);
    api
      .addNewCard(name, link)
      .then((res) => {
        createCard(res);
        popupWithCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithCard.waitLoad(false);
      });
  },
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  popupWithCard.open();
  formValidatorCard.disableSubmitButton();
  formValidatorCard.resetValidation();
});

popupWithCard.setEventListeners();

// Форма редактирования аватара

const popupWithAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: (link) => {
    popupWithAvatar.waitLoad(true);
    api
      .addNewAvatar(link)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.waitLoad(false);
      });
  },
});

buttonEditAvatar.addEventListener("click", () => {
  popupWithAvatar.open();
  formValidatorAvatar.disableSubmitButton();
  formValidatorAvatar.resetValidation();
});

popupWithAvatar.setEventListeners();

// Валидация форм

const formValidatorCard = new FormValidator(
  validationSettings,
  formElementCard
);
const formValidatorProfile = new FormValidator(
  validationSettings,
  formEditProfile
);

const formValidatorAvatar = new FormValidator(
  validationSettings,
  formEditAvatar
);

formValidatorCard.enableValidation();
formValidatorProfile.enableValidation();
formValidatorAvatar.enableValidation();
