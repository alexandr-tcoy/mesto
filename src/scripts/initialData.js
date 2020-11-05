export const editProfileModal = document.querySelector('.modal_type_edit');
export const openEditProfileModal = document.querySelector('.profile__edit');
export const closeEditProfileModal = document.querySelector('.modal__close-button');
export const saveEditProfileModal = document.querySelector('.modal__button');
export const formEditModal = editProfileModal.querySelector('.modal__form');
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');
export const inputName = formEditModal.querySelector('.modal__text_type_name');
export const inputAbout = formEditModal.querySelector('.modal__text_type_about');
export const addPlaceModal = document.querySelector('.modal_type_add');
export const openAddPlaceModal = document.querySelector('.profile__button');
export const closeAddPlaceModal = addPlaceModal.querySelector('.modal__close-button');
export const saveAddPlaceModal = addPlaceModal.querySelector('.modal__button');
export const formAddModal = addPlaceModal.querySelector('.modal__form');
export const inputPlace = addPlaceModal.querySelector('.modal__text_type_place');
export const inputUrl = addPlaceModal.querySelector('.modal__text_type_url');
export const imageModal = document.querySelector('.modal_type_img');
export const closeImageModal = imageModal.querySelector('.modal__close-button');
export const imgModal = imageModal.querySelector(".modal__img");
export const titleImageModal = imageModal.querySelector(".modal__under-title");
export const elements = document.querySelector('.elements__list');

export const initialCards = [  
    {  
        name: "Байкал",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"  
    },  
    {  
        name: "Холмогорский район",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"  
    },  
    {  
        name: "Камчатка",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"  
    },  
    {  
        name: "Иваново",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"  
    },  
    {  
        name: "Челябинская область",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"  
    },  
    {  
        name: "Архыз",  
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"  
    }  
];  

export const validationConfig = {
    formSelector: '.modal__form',
    inputSelector: '.modal__text',
    submitButtonSelector: '.modal__button',
    inactiveButtonClass: 'modal__button_disabled',
    inputErrorClass: 'modal__text_type_error',
    errorClass: 'modal__error_visible'
}