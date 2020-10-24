import { initialCards, validationConfig } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const content = document.querySelector(".content");
const profile = content.querySelector(".profile");
const editProfileModal = document.querySelector(".modal_type_edit");
const openEditProfileModal = profile.querySelector(".profile__edit");
const closeEditProfileModal = document.querySelector(".modal__close-button");
const saveEditProfileModal = document.querySelector(".modal__button");
const formEditModal = editProfileModal.querySelector(".modal__form");
const profileName = profile.querySelector(".profile__title");
const profileAbout = profile.querySelector(".profile__subtitle");
const inputName = formEditModal.querySelector(".modal__text_type_name");
const inputAbout = formEditModal.querySelector(".modal__text_type_about");
const addPlaceModal = document.querySelector(".modal_type_add");
const openAddPlaceModal = document.querySelector(".profile__button");
const closeAddPlaceModal = addPlaceModal.querySelector(".modal__close-button");
const saveAddPlaceModal = addPlaceModal.querySelector(".modal__button");
const formAddModal = addPlaceModal.querySelector(".modal__form");
const inputPlace = addPlaceModal.querySelector(".modal__text_type_place");
const inputUrl = addPlaceModal.querySelector(".modal__text_type_url");
const imageModal = document.querySelector(".modal_type_img");
const closeImageModal = imageModal.querySelector(".modal__close-button");
const elements = content.querySelector(".elements");

export function toggleModal(modal) {
    const opened = modal.classList.contains("modal_is-open");
    if (opened) {
      document.removeEventListener("keydown", closeEcape);
      document.removeEventListener("click", closeOverlay);
    } else {
      document.addEventListener("keydown", closeEcape);
      document.addEventListener("click", closeOverlay);
    }
    modal.classList.toggle("modal_is-open");
  };
  
  function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
      toggleModal(document.querySelector(".modal_is-open"));
    };
  };
  
  function closeEcape(evt) {
    if (evt.key === "Escape") {
      toggleModal(document.querySelector(".modal_is-open"));
    };
  };

function toggleEditProfileModal(editProfileModal) {
    toggleModal(editProfileModal);
    if (editProfileModal.classList.contains("modal_is-open")) {
        inputName.value = profileName.textContent;
        inputAbout.value = profileAbout.textContent;
    };
    editProfileModalFormValidator.hideAllErrors();
    editProfileModalFormValidator.addButtonActive(saveEditProfileModal);
};

function toggleAddProfileModal(addPlaceModal) {
    toggleModal(addPlaceModal);
    formAddModal.reset();
    addProfileModalFormValidator.hideAllErrors();
    addProfileModalFormValidator.removeButtonActive(saveAddPlaceModal);
};

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, ".template-card");
    const cardElement = card.generateCard();
    elements.append(cardElement);
});

const editProfileModalFormValidator = new FormValidator(validationConfig, editProfileModal);
editProfileModalFormValidator.enableValidation();
const addProfileModalFormValidator = new FormValidator(validationConfig, addPlaceModal);
addProfileModalFormValidator.enableValidation();

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    toggleEditProfileModal(editProfileModal);
};

function addCard(card) {
    elements.prepend(card);
};

function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    const card = new Card(inputPlace.value, inputUrl.value, ".template-card");
    const cardElement = card.generateCard();
    addCard(cardElement);
    toggleAddProfileModal(addPlaceModal);
};

openEditProfileModal.addEventListener("click", () => toggleEditProfileModal(editProfileModal));
openAddPlaceModal.addEventListener("click", () => toggleAddProfileModal(addPlaceModal));
closeEditProfileModal.addEventListener("click", () => toggleEditProfileModal(editProfileModal));
closeAddPlaceModal.addEventListener("click", () => toggleAddProfileModal(addPlaceModal));
closeImageModal.addEventListener("click", () => toggleModal(imageModal));
editProfileModal.addEventListener("submit", formSubmitHandler);
addPlaceModal.addEventListener("submit", formSubmitHandlerCard);