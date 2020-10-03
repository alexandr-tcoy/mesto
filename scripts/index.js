const initialCards = [  
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
const titleImageModal = document.querySelector(".modal__under-title");
const closeImageModal = imageModal.querySelector(".modal__close-button");
const templateCard = document.querySelector(".template-card").content;
const elements = content.querySelector(".elements");

function toggleModal(modal) {
    const opened = modal.classList.contains("modal_is-open");
    if (opened) {
        document.removeEventListener("keydown", closeEcape)
        document.removeEventListener("click", closeOverlay);
    } else {
        document.addEventListener("keydown", closeEcape)
        document.addEventListener("click", closeOverlay);
    }
    modal.classList.toggle("modal_is-open");
};

function toggleEditProfileModal(editProfileModal) {
    toggleModal(editProfileModal);
    if (editProfileModal.classList.contains("modal_is-open")) {
        inputName.value = profileName.textContent;
        inputAbout.value = profileAbout.textContent;
    };

    saveEditProfileModal.classList.remove("modal__button_disabled");
    saveEditProfileModal.removeAttribute("disabled");
    hideInputError(editProfileModal, inputName, testKit);
    hideInputError(editProfileModal, inputAbout, testKit);
};

function toggleAddProfileModal(addPlaceModal) {
    hideInputError(addPlaceModal, inputUrl, testKit);
    hideInputError(addPlaceModal, inputPlace, testKit);
    document.getElementsByName("add").disabled = true;

    toggleModal(addPlaceModal);
    inputPlace.value = "";
    inputUrl.value = "";
};

function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
        toggleModal(document.querySelector(".modal_is-open"));
    }
};

function closeEcape(evt) {
    if (evt.key === "Escape") {
        toggleModal(document.querySelector(".modal_is-open"));
    }
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    toggleEditProfileModal(editProfileModal);
};

function openImage(evt) {
    const clickedImage = evt.target;
    toggleModal(imageModal);
    imageModal.querySelector(".modal__img").src = clickedImage.src;
    titleImageModal.textContent = evt.target.closest(".element").querySelector(".element__text").textContent; 
};

function generateCard(initialCards) {
    const card = templateCard.cloneNode(true);
    const cardImage = card.querySelector(".element__photo");
    cardImage.src = initialCards.link;
    card.querySelector(".element__text").textContent = initialCards.name;
    card.querySelector(".element__photo").addEventListener("click", openImage);
    card.querySelector(".element__like").addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like_active");
    });
    card.querySelector(".element__delete").addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
    });
    saveAddPlaceModal.classList.add("modal__button_disabled");
    saveAddPlaceModal.setAttribute("disabled", true);
    return card;
};

function additionNewCard(card) {
    const addition = generateCard(card);
    elements.prepend(addition);
};

initialCards.forEach(card => {
    elements.append(generateCard(card))
});

function formSubmitHandlerCard(evt) {
    evt.preventDefault();
    const newPlace = {name: inputPlace.value, link: inputUrl.value};
    additionNewCard(newPlace);
    toggleAddProfileModal(addPlaceModal);
    document.getElementsByName("add").disabled = true;
};

openEditProfileModal.addEventListener("click", () => toggleEditProfileModal(editProfileModal));
closeEditProfileModal.addEventListener("click", () => toggleEditProfileModal(editProfileModal));
editProfileModal.addEventListener("submit", formSubmitHandler);
openAddPlaceModal.addEventListener("click", () => toggleAddProfileModal(addPlaceModal));
closeAddPlaceModal.addEventListener("click", () => toggleAddProfileModal(addPlaceModal));
addPlaceModal.addEventListener("submit", formSubmitHandlerCard);
closeImageModal.addEventListener("click", () => toggleModal(imageModal));