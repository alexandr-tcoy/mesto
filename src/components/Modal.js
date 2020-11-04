export default class Modal {
    constructor(modalSelector) {
        this._modalSelector = modalSelector;
        this._closeButton = this._modalSelector.querySelector('.modal__close-button');
        this._closeEsc = this._closeEsc.bind(this);
    }

    _closeEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeOverlay(evt) {
        if (evt.target.classList.contains('modal')) {
            this.close();
        }
    }

    _handleCloseButton() {
        this.close()
    }

    open() {
        this._modalSelector.classList.add('modal_is-open');
        document.addEventListener('keydown', this._closeEsc);
    }

    close() {
        this._modalSelector.classList.remove('modal_is-open');
        document.removeEventListener('keydown', this._closeEsc);
    }

    setEventListeners() {
        this._modalSelector.addEventListener('click', this._closeOverlay.bind(this));
        this._closeButton.addEventListener('click', this._handleCloseButton.bind(this));
    }

    removeEventListeners() {
        this._modalSelector.removeEventListener('click', this._closeOverlay.bind(this));
    }
}