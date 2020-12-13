export class Modal {
   
constructor(modalSelector) { 
    this._element = document.querySelector(modalSelector); 
    this._handleEscClose = this._handleEscClose.bind(this);
}

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

open() {
    this._element.classList.add('modal_is-open');
    document.addEventListener('keydown', this._handleEscClose);
}

close() {
    this._element.classList.remove('modal_is-open');
    document.addEventListener('keydown', this._handleEscClose);
}

    setEventListeners() {
        this._element.querySelector('.modal__close-button').addEventListener('click', () => {
            this.close();
        })
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target !== evt.currentTarget) {
                return
            }
            this.close();
        })
    }
}
















































// export class Modal {
//     constructor(modalSelector) {
//         this._element = document.querySelector(modalSelector);
//     }

    
//     _handleEscClose(evt) {
//         if (evt.key === 'Escape') {
//             this.close()
//         }
//     }

//     open() {
//         this._element.classList.add('modal_is-open');
//         document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
//     }

//     close() {
//         this._element.classList.remove('modal_is-open');
//         document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
//     }

//     setEventListeners() {
//         this._element.querySelector('.modal__close-button').addEventListener('click', () => {
//             this.close();
//         })
//         this._element.addEventListener('mousedown', (evt) => {
//             if (evt.target !== evt.currentTarget) {
//                 return
//             }
//             this.close();
//         })
//     }
// }

