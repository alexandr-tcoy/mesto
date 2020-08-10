const showInputError = (formElement, inputElement, errorMessage, {classError, inputError}) => {
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.add(inputError);
    errorElement.classList.add(classError);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {classError, inputError}) => {
    const errorElement =  formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.remove(inputError);
    errorElement.classList.remove(classError);
    errorElement.TextContent = "";
};

const checkInputValidity = (formElement, inputElement, {...remain}) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, remain); 
    } else {
        hideInputError(formElement, inputElement, remain);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid); 
};

const modalButtonAktive = (modalButtons, {disabledButtonSelector, ...remain}) => {
    modalButtons.classList.remove(disabledButtonSelector);
    modalButtons.disabled = false;
};

const modalButtonDisabled = (modalButtons, {disabledButtonSelector, ...remain}) => {
    modalButtons.classList.add(disabledButtonSelector);
    modalButtons.disabled = true;
};

const toggleButtonState = (inputList, modalButtons, {...remain}) => {
    if (hasInvalidInput(inputList)) {
        modalButtonDisabled(modalButtons, remain);
    } else {
        modalButtonAktive(modalButtons, remain);
    };
};

const setEventListeners = (formElement,{inputListSelector, buttonSelector, ...remain}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputListSelector));
    const modalButtons = formElement.querySelector(buttonSelector);
    toggleButtonState(inputList, modalButtons, remain);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", (evt) => {
        checkInputValidity(formElement, inputElement, remain);
        toggleButtonState(inputList, modalButtons, remain);
        });
    });
};

const enableValidation = ({containerSelector, ...remain}) => {
    const formList = Array.from(document.querySelectorAll(containerSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();    
        });
    setEventListeners(formElement, remain);
});
};

enableValidation(modalSet);

function  modalContainerReset(modal, {containerSelector, inputListSelector, buttonSelector, ...rest}){
    const specificModalContainer =  modal.querySelector(containerSelector);
    const specificInputListFormList = Array.from(specificModalContainer.querySelectorAll(inputListSelector));
    const specificButton = specificModalContainer.querySelector(buttonSelector);
    // specificModalContainer.reset(); 
    profileInputs ();
    specificInputListFormList.forEach((specificInputListFormListElement) => {
        hideInputError(specificModalContainer, specificInputListFormListElement, rest);
        toggleButtonState(specificInputListFormList, specificButton, rest);
        });
    };