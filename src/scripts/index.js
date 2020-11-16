import "../pages/index.css";
import Card from "../components/Card.js";

import {
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
  deleteModal,
  editProfileAvatar,
  avatarModal,
  avatarModalButton,
  profileAvatar,
  initialCards
} from "../scripts/initialData.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import ModalConfirm from "../components/ModalConfirm";

const modalProfileFormValidator = new FormValidator(validationConfig, editProfileModal);
modalProfileFormValidator.enableValidation();

const modalPlaceFormValidator = new FormValidator(validationConfig, addPlaceModal);
modalPlaceFormValidator.enableValidation();

const modalFormAvatarValidator = new FormValidator(validationConfig, avatarModal);
modalFormAvatarValidator.enableValidation();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "74d3db70-90e4-454f-a678-b0b06c14da91",
    "Content-Type": "application/json"
  }
});

const imgModal = new ModalWithImage(imageModal);

const userProfile = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar
});

// Promise.all([
//   api.getUserInfo(),
//   api.getInitialCards()
// ])
// .then((values) => {
//   const [userData, items] = values;
//   userProfile.setUserData(userData.name, userData.about, userData._id, userData.avatar);
//   cardList.renderItems(userData, items);
// })
// .catch((err) => {
//   console.log(err);
// })

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then((values) => {
  const [userData, items] = values;
  userProfile.setUserData(userData.name, userData.about, userData._id, userData.avatar);
  const initialCardList = new Section({
      items: items,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: handleCardClick,
          handleLikeClick: globalHandleLikeCardClick,
          handleDeleteButtonClick: handleDeleteCardClick
        }, userProfile.getUserId(), '.template-card');
        const cardElement = card.generateCard();
        initialCardList.setItem(cardElement);
      }
    },
    '.elements');
  initialCardList.renderItems();
})
.catch((err) => {
  console.log(err);
})

const handleCardClick = (data) => {
  imgModal.open(data)
}

const globalHandleLikeCardClick = (card) => {
  if (card.isLiked()) {
    api.dislikeCard(card.id())
      .then((data) => {
        card.setLikesInfo(data)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.likeCard(card.id())
      .then((data) => {
        card.setLikesInfo(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const handleDeleteCardClick = (card) => {
  deleteModalConfirmation.open();
  deleteModalConfirmation.handlerSubmit(() => {
    deleteModalConfirmation.loading(true);
    api.deleteCard(card.id())
      .then((data) => {
        card.deleteElement(data);
        deleteModalConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteModalConfirmation.loading(false);
      })
  })
}

const renderCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: handleCardClick,
    handleLikeClick: globalHandleLikeCardClick,
    handleDeleteButtonClick: handleDeleteCardClick
  }, userProfile.getUserId(), ".template-card");
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
  // return card;
}

const cardList = new Section({
    items: initialCards,
  },
  ".elements"
);

const addModalPlace = new ModalWithForm({
  handleFormSubmit: (item) => {
    addModalPlace.loading(true);
    api.postNewCard(item)
      .then((item) => {
        renderCard(item);
        addModalPlace.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addModalPlace.loading(false);
      })
  }
}, addPlaceModal);

const editModalProfile = new ModalWithForm({
  handleFormSubmit: ({
    name,
    about
  }) => {
    editModalProfile.loading(true);
    api.setUserInfo({
        name: name,
        about: about
      })
      .then((res) => {
        userProfile.setUserData(res.name, res.about, res._id, res.avatar);
        editModalProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editModalProfile.loading(false);
      })
  }
}, editProfileModal)

const modalFormAvatar = new ModalWithForm({
  handleFormSubmit: ({
    avatar
  }) => {
    modalFormAvatar.loading(true);
    api.setUserAvatar({
        avatar: avatar
      })
      .then((res) => {
        userProfile.setUserData(res.name, res.about, res._id, res.avatar);
        modalFormAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        modalFormAvatar.loading(false);
      })
  }
}, avatarModal)

const deleteModalConfirmation = new ModalConfirm(deleteModal);

imgModal.setEventListeners();
addModalPlace.setEventListeners();
editModalProfile.setEventListeners();
deleteModalConfirmation.setEventListeners();
modalFormAvatar.setEventListeners();

openAddPlaceModal.addEventListener("click", () => {
  addModalPlace.open();
  modalPlaceFormValidator.hideAllErrors();
  modalPlaceFormValidator.removeButtonActive(saveAddPlaceModal);
})

openEditProfileModal.addEventListener("click", () => {
  const profileInfo = userProfile.getUserData();

  inputName.value = profileInfo.name;
  inputAbout.value = profileInfo.about;

  modalProfileFormValidator.hideAllErrors();
  modalProfileFormValidator.addButtonActive(saveEditProfileModal);
  editModalProfile.open()
})

editProfileAvatar.addEventListener("click", () => {
  modalFormAvatar.open();
  modalFormAvatarValidator.hideAllErrors();
  modalFormAvatarValidator.removeButtonActive(avatarModalButton);
})

