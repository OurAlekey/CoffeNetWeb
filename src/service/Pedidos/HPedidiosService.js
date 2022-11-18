import axios from "axios";
import Api from "../../Api";
import addressingError from "../../hooks/addressingError";
const token = localStorage.getItem("token");

const api = new Api();
var { jwt } = {};

export default class HPedidiosService {
  async findAll() {
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(api.baseUrl() + `/pedidosistory/all`, {
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

      let res = await fetch(api.baseUrl() + "/pedidosistory/save", config);
      let json = await res.json();
      return json;
    } catch (error) {
      addressingError(error);
    }
  }

  async findByFilNuevo() {
    var suc = JSON.parse(localStorage.getItem("user"));

    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(
        api.baseUrl() + `/pedidosistory/suc/${suc.sucId}/N`,
        {
          headers: { Authorization: `Bearer ${jwt.jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      addressingError(error);
    }
  }

  async findByFilResuelto(pageNumber) {
    var suc = JSON.parse(localStorage.getItem("user"));

    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(
        api.baseUrl() +
          `/pedidosistory/suc/page/${suc.sucId}/R?page=${pageNumber || 0}`,
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
      const response = await axios.get(api.baseUrl() + `/pedidosistory/0`, {
        headers: { Authorization: `Bearer ${jwt.jwt}` },
      });
      return response?.data;
    } catch (error) {}
  }
}
