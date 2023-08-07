import {
  profileName,
  profileSubtitle,
  nameInput,
  aboutInput,
  avatarImg,
} from "../pages/index.js";

export default class UserInfo {
  constructor({ userName, userJob }) {
    this._name = userName;
    this._job = userJob;
  }
  getUserInfo() {
    return { userName: this._name, userjob: this._job };
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
    profileName.textContent = name;
    profileSubtitle.textContent = job;
    nameInput.value = name;
    aboutInput.value = job;
    avatarImg.src = this._avatarUrl;
  }

  setUserAvatar(link) {
    this._avatarUrl = link;
  }
}
