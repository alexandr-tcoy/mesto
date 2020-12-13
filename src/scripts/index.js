import '../pages/index.css';

import { Api } from '../components/Api.js';
import { validationConfig } from '../scripts/initialData.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { ModalWithForm } from '../components/ModalWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { ModalWithImage } from '../components/ModalWithImage.js';
import { ModalConfirm } from '../components/ModalConfirm.js'
import {
    initialCards,
    editButton,
    editModal,
    avatarButton,
    addButton,
    addModal,
    avatarModal,
    formEdit,
    formAdd,
    formAvatar,
    imageModal,
    nameInput,
    jobInput,
    profileName,
    profileAbout,
    profileAvatar,
    listElements,
    deleteCard,
    submitCard,
    submitInfo,
    submitAvatar,
    cardTemplateSelector
} from '../scripts/initialData.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'c85d6054-6c96-4dd2-ae06-9bba35f31e9d',
        'Content-Type': 'application/json'
    }
});

const profileValidator = new FormValidator(validationConfig, formEdit);
const cardValidator = new FormValidator(validationConfig, formAdd);
const avatarValidator = new FormValidator(validationConfig, formAvatar);
const modalImage = new ModalWithImage(imageModal);
const userProfile = new UserInfo({ name: profileName, about: profileAbout, avatar: profileAvatar });
const deleteCardModal = new ModalConfirm({ modalSelector: deleteCard });
let userId = '';

Promise.all([api.getInitialCards(), api.getUserData()])
    .then((result) => {
        const [items, userInfo] = result;
        userId = userInfo._id;
        cardList.rendererItems(items);
        userProfile.setUserInfo(userInfo);
    })
    .catch((err) => {
        console.log(err);
    });
  
const renderer = (item) => {
    const card = new Card(item, userId, cardTemplateSelector, addLike, deleteLike, handleDelete, handleCardClick);
    const cardElement = card.genetareCard();
    cardList.addItem(cardElement);

    function handleCardClick(data) {
        modalImage.open(data);
    }

    function handleDelete(item) {
        deleteCardModal.setFormSubmitHandler(() => {
            api.deleteCard(item._id)
                .then(() => {
                    card.deletePhoto();
                    deleteCardModal.close();
                })
                .catch((err) => {
                    console.log(`${err}`)
                });
        })
        deleteCardModal.open();
    }

    function addLike(cardId) {
        api.addLike(cardId)
            .then(() => {
                console.log('you added like')
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function deleteLike(cardId) {
        api.deleteLike(cardId)
            .then(() => {
                console.log('you removed like')
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
const cardList = new Section({
    items: initialCards,
    renderer
},
    listElements
);


const addCardModal = new ModalWithForm({
    modalSelector: addModal,
    handleFormSubmit: (item) => {
        renderLoading(true, submitCard);
        api.postNewCard(item)
            .then((item) => {
                renderer(item);
                addCardModal.close();
                console.log('the card was uploaded')
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, submitCard);
            });
    }
});



const profileModal = new ModalWithForm({
    modalSelector: editModal,
    handleFormSubmit: (item) => {
        renderLoading(true, submitInfo);
        api.setUserData(item)
            .then((item) => {
                userProfile.setUserInfo(item);
                profileModal.close();
                console.log('the profile info was updated')
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, submitInfo);
            });
    }
});



const addAvatarModal = new ModalWithForm({
    modalSelector: avatarModal,
    handleFormSubmit: (item) => {
        renderLoading(true, submitAvatar);
        api.setUserAvatarData(item)
            .then((item) => {
                userProfile.setUserInfo(item);
                addAvatarModal.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, submitAvatar);
            });
    }
});

const removeFormErrors = (formElement) => {
    cardValidator.clearFormError(formElement, validationConfig);
    avatarValidator.clearFormError(formElement, validationConfig);
}

addButton.addEventListener('click', () => {
    formAdd.reset();
    removeFormErrors(addModal);
    addCardModal.open();
});

editButton.addEventListener('click', () => {
    const user = userProfile.getUserInfo();
    nameInput.value = user.name;
    jobInput.value = user.about;
    profileValidator.clearFormError();
    profileModal.open();
});

avatarButton.addEventListener('click', () => {
    addAvatarModal.open();
    formAvatar.reset();
    removeFormErrors(avatarModal);
});

function renderLoading(isLoading, button) {
    if (isLoading) {
      button.textContent = 'Сохранение...';
    } else {
      button.textContent = 'Сохранить';
    }
}

addAvatarModal.setEventListeners();
profileModal.setEventListeners();
addCardModal.setEventListeners();
modalImage.setEventListeners();
deleteCardModal.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();