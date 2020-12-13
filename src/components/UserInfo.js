export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._nameSelector = name;
        this._aboutSelector = about;
        this._avatarSelector = avatar;
        this._name = document.querySelector(this._nameSelector);
        this._about = document.querySelector(this._aboutSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.about = this._about.textContent;
        return this._userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}