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

const templateCard = document.querySelector(".template-card").content.querySelector(".element");
const cardList = document.querySelector(".elements");
const profile = document.querySelector(".profile");
const profileButtonAdd = profile.querySelector(".profile__button");
const profileButtonEdit = profile.querySelector(".profile__edit");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const modalTypeEdit = document.querySelector(".modal_type_edit");
const modalEditButtonClose = modalTypeEdit.querySelector(".modal__close-button");
const modalContainerEdit = modalTypeEdit.querySelector(".modal__container");
const modalName = modalTypeEdit.querySelector(".modal__text_type_name");
const modalAbout = modalTypeEdit.querySelector(".modal__text_type_about");
const modalTypeAdd = document.querySelector(".modal_type_add");
const modalAddButtonClose = modalTypeAdd.querySelector(".modal__close-button");
const modalContainerAdd = modalTypeAdd.querySelector(".modal__container");
const modalPlace = modalTypeAdd.querySelector(".modal__text_type_place");
const modalUrl= modalTypeAdd.querySelector(".modal__text_type_url");
const modalTypeImg = document.querySelector(".modal_type_img");
const modalImgButtonClose = modalTypeImg.querySelector(".modal__close-button");
const modalImg = modalTypeImg.querySelector(".modal__img");
const modalUnderTitle = modalTypeImg.querySelector(".modal__under-title");
const modalButton = modalTypeAdd.querySelector(".modal__button");
const modalSet = {
    containerSelector: ".modal__container", 
    inputListSelector: ".modal__text", 
    buttonSelector: ".modal__button", 
    disabledButtonSelector: "modal__button_disabled", 
    classError: "modal__error_visible", 
    inputError: "modal__text_type_error"
};

function toggle(modal) {
    modal.classList.toggle("modal_is-open");
    toggleEscape(modal);
    toggleOverlay(modal);
    modalName.value = profileTitle.textContent;
    modalAbout.value = profileSubtitle.textContent;
};

function modalInputs (modal) {
    if (modal !== modalTypeImg) {
        modalContainerReset(modal, modalSet);
    };
};

function profileInputs () {
};

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalName.value;
    profileSubtitle.textContent = modalAbout.value;  
    modalTypeEditInputs(modalTypeEdit);
};

function modalTypeEditInputs (modalTypeEdit) {
    if(modalTypeEdit.classList.contains("modal_is-open")){
        profileInputs();
    };
    toggle(modalTypeEdit);
};

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({name: modalPlace.value, link: modalUrl.value});
    toggle(modalTypeAdd);
};

const clickImg = (evt) => {
    toggle(modalTypeImg);
    console.log(evt.target.src);
    modalImg.src = evt.target.src;
    modalUnderTitle.textContent = evt.target.closest(".element").querySelector(".element__text").textContent;
    modalImgOpenImgState.alt = evt.target.alt;
};

const toggleLike = (evt) => {
    evt.target.classList.toggle("element__like_active");
};

const deleteClosest = (evt) => {
    evt.target.closest(".element").remove();
};

initialCards.forEach((data) => {
    renderCard(data);
});

function renderCard(data) {
    cardList.prepend(joinCard(data));
};

function joinCard(data) {
    const elementCard = templateCard.cloneNode(true);
    const elementPhoto = elementCard.querySelector(".element__photo");
    const elementText = elementCard.querySelector(".element__text");
    const elementLikeButton = elementCard.querySelector(".element__like");
    const elementDeleteButton = elementCard.querySelector(".element__delete");
    elementPhoto.src = data.link;
    elementText.textContent = data.name;
    elementPhoto.alt = data.name;
    elementLikeButton.addEventListener("click", toggleLike);
    elementDeleteButton.addEventListener("click", deleteClosest);
    elementPhoto.addEventListener("click", clickImg);
    return elementCard;
};

profileButtonEdit.addEventListener("click", () => {
    toggle(modalTypeEdit);
});

modalEditButtonClose.addEventListener("click", () => {
    toggle(modalTypeEdit);
});

modalContainerEdit.addEventListener("submit",editFormSubmitHandler);

profileButtonAdd.addEventListener("click", () => {
    toggle(modalTypeAdd);
    modalPlace.value = "";
    modalUrl.value ="";
});

modalAddButtonClose.addEventListener("click", () => {
    toggle(modalTypeAdd);
});

modalContainerAdd.addEventListener("submit", addFormSubmitHandler);

modalImgButtonClose.addEventListener("click", () => {
    toggle(modalTypeImg);
});

const modalIsOpen = (modal) => {
    return modal.classList.contains("modal_is-open");
};

const evtModalIsOpen = (evt) => {
    return evt.target.classList.contains("modal_is-open")
};

const escapeHandler = (evt, modal) => {
    if (evt.key === "Escape" && modal.classList.contains("modal_is-open")) {
        toggle(modal);
    };
};

const eventListenersAddEscape = (modal) => {
    document.addEventListener("keydown", (evt) => escapeHandler(evt, modal));    
};

const eventListenersRemoveEscape = (modal) => {
    document.removeEventListener("keydown", (evt) => escapeHandler(evt, modal));
};

const overlayHandler = (evt, modal) => {
        if (evtModalIsOpen(evt)) {
            toggle(modal);
    };
};

const eventListenersAddOverlay = (modal) => {
    modal.addEventListener("mouseup", (evt) => overlayHandler(evt, modal));    
};

const eventListenersRemoveOverlay = (modal) => {
    modal.removeEventListener("mouseup", (evt) => overlayHandler(evt, modal));
};

const  toggleOverlay = (modal) => {
    if (modalIsOpen(modal)) {
        eventListenersAddOverlay(modal);
    } else {
        eventListenersRemoveOverlay(modal);
    };
};

const  toggleEscape = (modal) => {
    if (modalIsOpen(modal)) {
        eventListenersAddEscape(modal);
    } else {
        eventListenersRemoveEscape(modal);
        modalInputs (modal);
    };
        console.log("Reset");
};