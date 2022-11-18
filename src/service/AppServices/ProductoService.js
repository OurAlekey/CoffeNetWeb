import axios from "axios";
import Api from "../../Api";
import addressingError from "../../hooks/addressingError";
const token = localStorage.getItem("token");

const api = new Api();
var { jwt } = {};

export default class ProductoService {
  async findAll() {
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(api.baseUrl() + `/producto/all`, {
        headers: { Authorization: `Bearer ${jwt.jwt}` },
      });
      return response.data;
    } catch (err) {
      addressingError(err);
    }
  }

  async save(data) {
    try {
      let config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt?.jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      let res = await fetch(api.baseUrl() + "/producto/save", config);
      let json = await res.json();
      return json;
    } catch (error) {
      addressingError(error);
    }
  }

  async findByFil(name) {
    var suc = JSON.parse(localStorage.getItem("user"));
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(
        api.baseUrl() + `/producto/filtro/${suc.sucId}/${name || "0"}`,
        {
          headers: { Authorization: `Bearer ${jwt.jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      addressingError(error);
    }
  }
}
