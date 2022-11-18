import axios from "axios";

const API_URL = "https://coffenet.herokuapp.com/coffenet/api/v1";

var { jwt } = {};

export default class AuthService {
  async login(user) {
    try {
      const response = await axios.post(API_URL + "/auth/authenticate", user);
      if (response.data.accessToken) {
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(username, token1) {
    if (token1) {
      jwt = JSON.parse(token1);
    }
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt.jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      };

      let res = await fetch(API_URL + "/usuario/usu/" + username, config);
      let json = await res.json();
      return json;
    } catch (err) {
      console.log("error");
    }
  }

  logout() {
    localStorage.removeItem("user");
  }
  register(username, password) {
    return axios.post(API_URL + "/auth/authenticate", {
      username,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
