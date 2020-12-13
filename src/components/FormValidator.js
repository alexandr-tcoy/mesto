export class FormValidator {
  constructor(validationConfig, formElement) {
      this._formElement = formElement;
      this._formSelector = validationConfig.formSelector;
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;
  }

  _showError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  }

  _hideError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
          this._showError(inputElement, inputElement.validationMessage);
      }
      else {
          this._hideError(inputElement);
      }
  }

  _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  }

  _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.setAttribute('disabled', true);
      } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
      }
  }

  _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState(inputList, buttonElement);
          });
      });
  }

  clearFormError() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      inputList.forEach((inputElement) => {
          this._hideError(inputElement);
          const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
          this._toggleButtonState(inputList, buttonElement);
      });
  }

  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      this._setEventListeners();
  }
}