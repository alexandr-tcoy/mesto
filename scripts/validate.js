const testKit = {
    formSelector: ".modal__form",
    inputSelector: ".modal__text",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__text_type_error",
    errorClass: "modal__error_visible"
};

const showInputError = (formElement, inputElement, errorMessage, testKit) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(testKit.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(testKit.errorClass);
};

const hideInputError = (formElement, inputElement, testKit) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(testKit.inputErrorClass);
    errorElement.classList.remove(testKit.errorClass);
    errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const checkInputValidity = (formElement, inputElement, testKit) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, testKit);
    } else {
        hideInputError(formElement, inputElement, testKit);
    }
};

const toggleButtonState = (inputList, buttonElement, testKit) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(testKit.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(testKit.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, testKit) => {
    const inputList = Array.from(formElement.querySelectorAll(testKit.inputSelector));
    const buttonElement = formElement.querySelector(testKit.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, testKit);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement, testKit);
            toggleButtonState(inputList, buttonElement, testKit);
        });
    });
};

const enableValidation = (testKit) => {
    const formList = Array.from(document.querySelectorAll(testKit.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, testKit);
    });
};

enableValidation(testKit);