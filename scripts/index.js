const popupElement = document.querySelector(".popup_profile");
const popupElementCard = document.querySelector(".popup_card");
const popupElementPhoto = document.querySelector(".popup_photo");
const closeButton = popupElement.querySelector(".popup__button");
const closeButtonCard = popupElementCard.querySelector(".popup__button-card");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".form");
const formElementCard = document.querySelector(".form-card");
const nameInput = formEditProfile.querySelector(".form__item_theme_name");
const jobInput = formEditProfile.querySelector(".form__item_theme_job");
const titleInput = formElementCard.querySelector(".form__item_theme_title");
const linkInput = formElementCard.querySelector(".form__item_theme_link");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const openPhoto = document.querySelector(".element__photo");
const elementPopupTitle = popupElementPhoto.querySelector(".popup__title");
const elementPopupPhoto = popupElementPhoto.querySelector(".popup__image");
const closeButtonPhoto = popupElementPhoto.querySelector(
  ".popup__button-photo"
);
const cardsElementList = document.querySelector(".elements__list");
const templateCards = document
  .querySelector("#template-cards")
  .content.querySelector(".element");

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

// Форма редактирования профиля

buttonOpenEditProfileForm.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupElement);
});

closeButton.addEventListener("click", function () {
  closePopup(popupElement);
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
});
closeButtonCard.addEventListener("click", function () {
  closePopup(popupElementCard);
});
formElementCard.addEventListener("submit", handleFormCardSubmit);

// Открытие попапа с картинкой

const handleElementPhotoClick = (item) => {
  elementPopupPhoto.src = item.link;
  elementPopupPhoto.alt = item.name;
  elementPopupTitle.textContent = item.name;

  openPopup(popupElementPhoto);
};

closeButtonPhoto.addEventListener("click", function () {
  closePopup(popupElementPhoto);
});

// Закрытие попапа нажатием на Esc

const handleKeyDown = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

document.addEventListener("keydown", handleKeyDown);

// Закрытие попапа кликом на оверлей

const handlePopupOverlay = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

document.addEventListener("click", handlePopupOverlay);
