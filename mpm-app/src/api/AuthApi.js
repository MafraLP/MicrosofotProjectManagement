import CommonBaseApi from "./CommonBaseApi";
class AuthApi extends CommonBaseApi {
  login(data) {
    console.log(this.url);
    return this.post("/auth/login", data);
  }

  refresh() {
    console.log("refresh");
    return this.post("/auth/refresh");
  }

  logout() {
    return this.post("/logout");
  }
}

export default new AuthApi();
