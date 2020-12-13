import { Modal } from '../components/Modal.js';

export class ModalWithForm extends Modal {
    constructor({ modalSelector, handleFormSubmit }) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = Array.from(this._element.querySelectorAll('.modal__text'));
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._element.querySelector('.modal__form');
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}