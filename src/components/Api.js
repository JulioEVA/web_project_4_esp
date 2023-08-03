export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._userUrl = this._baseUrl + "/users/me";
  }

  _checkRequestStatus(res) {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { headers: this._headers })
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
    fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: "07941066-0302-4776-b982-c4274dd7ce77",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }
}
