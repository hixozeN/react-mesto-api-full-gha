class Api {
  constructor() {
    this._link = "https://api.mesto.hixozen.ru";
    // this._link = 'http://localhost:3000';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._link}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + token,
        Accept: "*/*",
      },
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._link}/users/me `, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards(token) {
    return fetch(`${this._link}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + token,
        Accept: "*/*",
      },
    }).then((res) => this._checkResponse(res));
  }

  createCard({ name, link }) {
    return fetch(`${this._link}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  putCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "PUT",
    }).then((res) => this._checkResponse(res));
  }

  deleteCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        method: "DELETE",
      }).then((res) => this._checkResponse(res));
    } else {
      return fetch(`${this._link}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        method: "PUT",
      }).then((res) => this._checkResponse(res));
    }
  }
}

const api = new Api();

export default api;
