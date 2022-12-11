const popups = document.querySelectorAll(".popup");
const popupElement = document.querySelector(".popup_profile");
const popupElementCard = document.querySelector(".popup_card");
const popupElementPhoto = document.querySelector(".popup_photo");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".form__profile");
const formElementCard = document.querySelector(".form-card");
const nameInput = formEditProfile.querySelector(".form__item_theme_name");
const jobInput = formEditProfile.querySelector(".form__item_theme_job");
const titleInput = formElementCard.querySelector(".form__item_theme_title");
const linkInput = formElementCard.querySelector(".form__item_theme_link");
const submitButton = formElementCard.querySelector(".form__button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const openPhoto = document.querySelector(".element__photo");
const elementPopupTitle = popupElementPhoto.querySelector(".popup__title");
const elementPopupPhoto = popupElementPhoto.querySelector(".popup__image");
const cardsElementList = document.querySelector(".elements__list");
const templateCards = document
  .querySelector("#template-cards")
  .content.querySelector(".element");

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
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__button")) {
      closePopup(popup);
    }
  });
});

// Форма редактирования профиля

buttonOpenEditProfileForm.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupElement);
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupElement);
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

// Форма добавления карточки

const createCard = (item) => {
  const card = templateCards.cloneNode(true);
  const elementTitle = card.querySelector(".element__title");
  const elementPhoto = card.querySelector(".element__photo");
  const elementLike = card.querySelector(".element__like");
  const deleteButton = card.querySelector(".element__btn-delete");

  elementTitle.textContent = item.name;
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  elementLike.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  elementPhoto.addEventListener("click", () => handleElementPhotoClick(item));

  return card;
};

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("element__like_active");
};

const handleDeleteButtonClick = (evt) => {
  evt.target.closest(".element").remove();
};

const renderCard = (item, cardsElementList) => {
  const card = createCard(item);
  cardsElementList.prepend(card);
};

initialCards.forEach(function (item) {
  renderCard(item, cardsElementList);
});

const handleFormCardSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: titleInput.value,
    link: linkInput.value,
  };

  renderCard(card, cardsElementList);
  closePopup(popupElementCard);
  evt.target.reset();
};

buttonOpenAddCardForm.addEventListener("click", function () {
  openPopup(popupElementCard);
  submitButton.classList.add("form__button_inactive");
  submitButton.disabled = "disabled";
});

formElementCard.addEventListener("submit", handleFormCardSubmit);

// Открытие попапа с картинкой

const handleElementPhotoClick = (item) => {
  elementPopupPhoto.src = item.link;
  elementPopupPhoto.alt = item.name;
  elementPopupTitle.textContent = item.name;

  openPopup(popupElementPhoto);
};
