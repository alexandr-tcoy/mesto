import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
    constructor(modalSelector) {
        super(modalSelector);
    }

    open(cardPhoto, cardText) {
        const image = this._modalSelector.querySelector('.modal__img');
        const name = this._modalSelector.querySelector('.modal__under-title');

        image.src = cardPhoto;
        image.alt = cardText;
        name.textContent = cardText;

        super.open();
    }
}