export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = this._deleteCard.bind(this);
    this._likeCard = this._likeCard.bind(this);
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardText = this._element.querySelector('.element__text');
    this._cardPhoto = this._element.querySelector('.element__photo');
    this._setEventListeners();

    this._cardText.textContent = this._name;
    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;

    return this._element;
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  
  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._deleteCard);
      
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._likeCard);
      
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}