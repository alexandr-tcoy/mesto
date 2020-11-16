import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
    constructor({
        handleFormSubmit
    }, modalSelector) {
        super(modalSelector);
        this._form = this._modal.querySelector(".modal__form");
        this.handleFormSubmit = handleFormSubmit;

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
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues())
            // this.close();
        })
    }
    close() {
        super.close();
        this._form.reset();
    }
}