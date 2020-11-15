import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
    constructor(modalSelector) {
        super(modalSelector);
        this._imageModal = this._modal.querySelector('.modal__img');
        this._modalCaption = this._modal.querySelector('.modal__under-title');
    }

    open({
        name,
        link
    }) {
        super.open();
        super.setEventListeners();
        const image = this._imageModal;
        const caption = this._modalCaption;
        image.src = link;
        image.alt = name;
        caption.textContent = name;
    }
}
