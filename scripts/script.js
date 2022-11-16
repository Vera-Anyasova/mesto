const popupElement = document.querySelector(".popup");
const closeButton = popupElement.querySelector(".popup__button");
const editButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".form");
const nameInput = formElement.querySelector(".form__item_name");
const jobInput = document.querySelector(".form__item_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const openPopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
