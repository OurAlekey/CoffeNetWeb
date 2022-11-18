//import axios from "axios";

class Api {
  baseUrl = () => {
    return "https://coffenet.herokuapp.com/coffenet/api/v1";
  };

  async getToken(usr) {
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usr),
      };

      let res = await fetch(this.baseUrl() + "/auth/authenticate", config);
      let json = {
        token: await res.json(),
        status: res.status,
      };

      return json;
    } catch (err) {
      if (err.response.status === 403) {
        return (window.location = "#/login");
      } else {
        return err;
      }
    }
  }

  async getUser(usr, token) {
    try {
      let config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      let res = await fetch(this.baseUrl() + "/usuario/usu/" + usr, config);
      let user = await res.json();

      return user;
    } catch (error) {
      if (error.response.status === 403) {
        return (window.location = "#/login");
      } else {
        return error;
      }
    }
  }
}

export default Api;
