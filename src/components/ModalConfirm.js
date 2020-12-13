import { Modal } from '../components/Modal.js';

export class ModalConfirm extends Modal {
    constructor({ modalSelector }) {
        super(modalSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._element.querySelector('.modal__form');
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit();
        });
    }

    setFormSubmitHandler(handle) {
        this._handleSubmit = handle;
    }
}