import axios from "axios";
import Api from "../../Api";
import addressingError from "../../hooks/addressingError";
const token = localStorage.getItem("token");
const api = new Api();
var { jwt } = {};

export default class PedidiosService {
  async findAll() {
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(api.baseUrl() + `/pedidos/all`, {
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

      let res = await fetch(api.baseUrl() + "/pedidos/save", config);
      let json = await res.json();
      return json;
    } catch (error) {
      addressingError(error);
    }
  }

  async findByFil() {
    var suc = JSON.parse(localStorage.getItem("user"));
    console.log(suc.sucId);
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(
        api.baseUrl() + `/pedidos/suc/${suc.sucId}`,
        {
          headers: { Authorization: `Bearer ${jwt.jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      addressingError(error);
    }
  }
  async findUseSave() {
    var suc = JSON.parse(localStorage.getItem("user"));
    console.log(suc.sucId);
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(api.baseUrl() + `/pedidos/0`, {
        headers: { Authorization: `Bearer ${jwt.jwt}` },
      });
      return response?.data;
    } catch (error) {}
  }
}
