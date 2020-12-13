export const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__text",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__text_type_error",
    errorClass: "modal__error_visible",
}

const editButton = document.querySelector('.profile__edit');
const editModal = '.modal_type_edit';
const addButton = document.querySelector('.profile__button');
const addModal = '.modal_type_add';
const formEdit = document.querySelector('.modal__form');
const formAdd = document.querySelector('.modal__form');
const avatarButton = document.querySelector('.profile__avatar-edit');
const avatarModal = '.modal_type_avatar';
const formAvatar = document.querySelector('.modal__form');
const imageModal = '.modal_type_img';
const nameInput = document.querySelector('.modal__text_type_name');
const jobInput = document.querySelector('.modal__text_type_about');
const profileName = '.profile__title';
const profileAbout = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const listElements = '.elements';
const deleteCard = '.modal_type_delete';
const cardTemplateSelector = '.template-card';
const submitCard = document.querySelector('.modal__button_add');
const submitInfo = document.querySelector('.modal__button_edit');
const submitAvatar = document.querySelector('.modal__button_avatar');


export {
    editButton,
    editModal,
    addButton,
    addModal,
    avatarButton,
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
    cardTemplateSelector,
}

export const initialCards = [];