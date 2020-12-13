export class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  _checkStatus(res) {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
      })
          .then(this._checkStatus);
  }

  getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,

      })
          .then(this._checkStatus);
  }

  postNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',  
        headers: this._headers,
          body: JSON.stringify({
              name: data.place,
              link: data.url
          })
      })
          .then(this._checkStatus);
  }

  setUserData(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',  
        headers: this._headers,  
          body: JSON.stringify({
              name: data.name,
              about: data.about
          })
      })
          .then(this._checkStatus);
  }

  setUserAvatarData(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          headers: this._headers,
          method: 'PATCH',
          body: JSON.stringify({
              avatar: data.avatar
          })
      })
          .then(this._checkStatus);
  }

  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
          headers: this._headers,
          method: 'DELETE'
      })
          .then(this._checkStatus);
  }

  addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers
      })
          .then(this._checkStatus);
  }

  deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
      })
          .then(this._checkStatus);
  }
}