import axios from "axios";
import Api from "../../Api";
import addressingError from "../../hooks/addressingError";
const token = localStorage.getItem("token");
const api = new Api();
var { jwt } = {};

export default class UsuarioService {
  async findByFil(usu, nom, ape) {
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const response = await axios.get(
        api.baseUrl() + `/usuario/filter/${usu || 0}/${nom || 0}/${ape || 0}`,
        {
          headers: { Authorization: `Bearer ${jwt.jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      addressingError(error);
    }
  }

  async all() {
    if (token) {
      jwt = JSON.parse(token);
    }
    try {
      const reponse = await axios.get(api.baseUrl() + `/usuario/all`, {
        headers: { Authorization: `Bearer ${jwt.jwt}` },
      });

      return reponse.data;
    } catch (error) {
      addressingError(error);
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

      let res = await fetch(api.baseUrl() + "/usuario/save", config);
      let json = await res.json();
      return json;
    } catch (error) {
      addressingError(error);
    }
  }
}
