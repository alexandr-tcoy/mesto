import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
    constructor(modalSelector, formSubmitHandler) {
        super(modalSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._modalSelector.querySelector(".modal__form");
    }
    
    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".modal__text");
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}