const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".modal__close-button");
const form = modal.querySelector(".modal__form");
const openModalButton = document.querySelector(".profile__edit");
const title = document.querySelector(".profile__title");
const subtitle = document.querySelector(".profile__subtitle");
const modalName = document.querySelector(".modal__text_type_name");
const modalAbout = document.querySelector(".modal__text_type_about");
const saveModalButton = document.querySelector(".modal__button");

openModalButton.addEventListener ("click", toggleModal);
closeModalButton.addEventListener ("click", toggleModal);
saveModalButton.addEventListener ("click", toggleModal);


function toggleModal() {
    modal.classList.toggle("modal_is-open");
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    title.textContent = modalName.value;
    subtitle.textContent = modalAbout.value;
};
form.addEventListener('submit', formSubmitHandler);


