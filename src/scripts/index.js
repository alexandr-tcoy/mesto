import "../pages/index.css";
import Card from "../components/Card.js";

import {
    initialCards,
    validationConfig,
    editProfileModal,
    imageModal,
    addPlaceModal,
    openEditProfileModal,
    openAddPlaceModal,
    inputName,
    inputAbout,
    profileAbout,
    profileName,
    saveAddPlaceModal,
    saveEditProfileModal,
    elements
} from "../scripts/initialData.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";

const modalProfileFormValidator = new FormValidator(validationConfig, editProfileModal);
modalProfileFormValidator.enableValidation();

const modalPlaceFormValidator = new FormValidator(validationConfig, addPlaceModal);
modalPlaceFormValidator.enableValidation();

function getCard(name, link) {
    const card = new Card(name, link, ".template-card", handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.addItem(getCard(item.name, item.link));
    }
}, ".elements");

cardList.renderItems();

const openImageModal = new ModalWithImage(imageModal);
openImageModal.setEventListeners();

function handleCardClick(name, link) {
    openImageModal.open(link, name);
}

const editModalProfile = new ModalWithForm(editProfileModal, () => {
    user.setUserInfo(inputName, inputAbout);
    editModalProfile.close();
})

const addModalPlace = new ModalWithForm(addPlaceModal, (data) => {
    cardList.addItem(getCard(data.place, data.url));
    addModalPlace.close();
})

editModalProfile.setEventListeners();
addModalPlace.setEventListeners();

const user = new UserInfo({
    name: profileName,
    about: profileAbout,
})

openEditProfileModal.addEventListener("click", () => {
    editModalProfile.open();
    const infoUser = user.getUserInfo();
    inputName.value = infoUser.name;
    inputAbout.value = infoUser.about;
    modalProfileFormValidator.hideAllErrors();
    modalProfileFormValidator.addButtonActive(saveEditProfileModal);
})

openAddPlaceModal.addEventListener("click", () => {
    addModalPlace.open();
    modalPlaceFormValidator.hideAllErrors();
    modalPlaceFormValidator.removeButtonActive(saveAddPlaceModal);
})