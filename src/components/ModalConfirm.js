import Modal from './Modal.js';

export default class ModalConfirm extends Modal {
  constructor(submitButton) {
    super(submitButton);
    this._formSubmit = this._modal.querySelector('.modal__form');
  }

  handlerSubmit(handlerFormSubmit) {
    this._handleFormSubmit = handlerFormSubmit;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }
}

