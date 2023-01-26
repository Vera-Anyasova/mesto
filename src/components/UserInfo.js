export class UserInfo {
  constructor({ userName, userJob }) {
    this._name = userName;
    this._job = userJob;
  }

  getUserInfo() {
    const data = {
      userName: this._name.textContent,
      userJob: this._job.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
