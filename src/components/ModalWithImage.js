import { Modal } from '../components/Modal.js';

export class ModalWithImage extends Modal {
    constructor(modalSelector) {
        super(modalSelector);
    }

    open(data) {
        super.open();
        const imageView = this._element.querySelector('.modal__img');
        const titlePopup = this._element.querySelector('.modal__under-title');
        imageView.src = data.link;
        titlePopup.textContent = data.name;
        imageView.alt = data.name;

    }
}