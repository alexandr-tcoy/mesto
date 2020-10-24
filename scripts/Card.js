import { toggleModal } from "./index.js";

  const imageModal = document.querySelector(".modal_type_img");
  const imgModal = imageModal.querySelector(".modal__img");
  const titleImageModal = imageModal.querySelector(".modal__under-title");
  
  export default class Card {
    constructor(name, link, cardSelector) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._deleteCard = this._deleteCard.bind(this);
      this._likeCard = this._likeCard.bind(this);
    };
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".element")
        .cloneNode(true);
      return cardElement;
    };
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      const cardPhoto = this._element.querySelector(".element__photo");
      const cardText = this._element.querySelector(".element__text");
      cardPhoto.src = this._link;
      cardText.textContent = this._name;
      cardPhoto.alt = this._name;
      return this._element;
    };
  
    _deleteCard() {
      this._element.remove();
    };
  
    _likeCard() {
      this._element
        .querySelector(".element__like")
        .classList.toggle("element__like_active");
    };
    
    _displayImg() {
      imgModal.src = this._link;
      titleImageModal.textContent = this._name;
      imgModal.alt = this._name;
      toggleModal(imageModal);
    };
  
    _setEventListeners() {
      this._element
        .querySelector(".element__photo")
        .addEventListener("click", (evt) => {
          evt.preventDefault();
          this._displayImg();
        });
      this._element
        .querySelector(".element__delete")
        .addEventListener("click", this._deleteCard);
      this._element
        .querySelector(".element__like")
        .addEventListener("click", this._likeCard);
    };
  };