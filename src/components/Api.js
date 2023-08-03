export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
        authorization: "07941066-0302-4776-b982-c4274dd7ce77",
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

  createCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: "07941066-0302-4776-b982-c4274dd7ce77",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).catch((error) => {
      console.log(error);
    });
  }
}
