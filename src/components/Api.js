export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
    this._userUrl = this._baseUrl + "/users/me";
    this._cardsUrl = this._baseUrl + "/cards";
  }

  _checkRequestStatus(res) {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._cardsUrl, { headers: this._headers })
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserInfo() {
    return fetch(this._userUrl, { headers: this._headers })
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUserInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).catch((error) => {
      console.log(error);
    });
  }

  updateUserAvatar(link) {
    return fetch(this._userUrl + "/avatar", {
      method: "PATCH",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCard(cardId) {
    return fetch(this._cardsUrl + `/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._authorization}`,
      },
    }).catch((error) => {
      console.log(error);
    });
  }

  likeCard(cardId) {
    return fetch(this._cardsUrl + `/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: `${this._authorization}`,
      },
    })
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dislikeCard(cardId) {
    return fetch(this._cardsUrl + `/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._authorization}`,
      },
    })
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
