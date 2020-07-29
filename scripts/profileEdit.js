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
const modaAddButtonClose = modalTypeAdd.querySelector(".modal__close-button");
const modalContainerAdd = modalTypeAdd.querySelector(".modal__container");
const modalPlace = modalTypeAdd.querySelector(".modal__text_type_place");
const modalUrl= modalTypeAdd.querySelector(".modal__text_type_url");
const modalTypeImg = document.querySelector(".modal_type_img");
const modalImgButtonClose = modalTypeImg.querySelector(".modal__close-button");
const modalImg = modalTypeImg.querySelector(".modal__img");
const modalUnderTitle = modalTypeImg.querySelector(".modal__under-title");

function toggle(modal) {
    modal.classList.toggle("modal_is-open");
};

function editModal (modalTypeEdit) {
    modalTypeEdit.classList.toggle("modal_is-open");
};

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    editModal(modalTypeEdit);
    profileTitle.textContent =  modalName.value;
    profileSubtitle.textContent = modalAbout.value;
};

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({name: modalPlace.value, link: modalUrl.value});
    toggle(modalTypeAdd);
    modalPlace.value = "";
    modalUrl.value = "";
};

const clickImg = (evt) => {
    toggle(modalTypeImg);
    modalImg.src = evt.target.src;
    modalUnderTitle.textContent = evt.target.closest(".element").querySelector(".element__text").textContent;
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
    const elementDeleteButton = elementCard.querySelector(".element__delete");
    const elementLikeButton = elementCard.querySelector(".element__like");
    elementText.textContent = data.name;
    elementPhoto.src = data.link;
    elementPhoto.addEventListener("click", clickImg);
    elementDeleteButton.addEventListener("click", deleteClosest);
    elementLikeButton.addEventListener("click", toggleLike);
    return elementCard;
};

profileButtonEdit.addEventListener("click", () => {
    toggle(modalTypeEdit);
  });
  
  modalEditButtonClose.addEventListener("click", () => {
    toggle(modalTypeEdit);
    modalName.value = profileTitle.textContent;
    modalAbout.value = profileSubtitle.textContent;
  });
  
  modalContainerEdit.addEventListener("submit",editFormSubmitHandler);
  
profileButtonAdd.addEventListener("click", () => {
  toggle(modalTypeAdd);
});

modaAddButtonClose.addEventListener("click", () => {
  toggle(modalTypeAdd);
  modalPlace.value = modalImg.textContent;
  modalUrl.value = modalUnderTitle.textContent;
});

modalContainerAdd.addEventListener("submit", addFormSubmitHandler);

modalImgButtonClose.addEventListener("click", () => {
  toggle(modalTypeImg);
});
