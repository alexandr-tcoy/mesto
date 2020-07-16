const openModalButton = document.querySelector(".profile__edit"); 
const title = document.querySelector(".profile__title"); 
const subtitle = document.querySelector(".profile__subtitle"); 
const modal = document.querySelector(".modal"); 
const closeModalButton = document.querySelector(".modal__close-button"); 
const modalName = document.querySelector(".modal__text_type_name"); 
const modalAbout = document.querySelector(".modal__text_type_about"); 
const form = modal.querySelector(".modal__form"); 
const saveModalButton = document.querySelector(".modal__button"); 

function openModal() {
    modal.classList.add("modal_is-open");
    modalName.value = title.textContent;
    modalAbout.value = subtitle.textContent;
};

function closeModal() {
    modal.classList.remove("modal_is-open");
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    modal.classList.remove("modal_is-open");
    title.textContent = modalName.value; 
    subtitle.textContent = modalAbout.value;
};
form.addEventListener("submit", formSubmitHandler);

openModalButton.addEventListener("click", openModal); 
closeModalButton.addEventListener("click", closeModal);
saveModalButton.addEventListener("click", formSubmitHandler);