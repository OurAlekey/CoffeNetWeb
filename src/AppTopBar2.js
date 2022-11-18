import React, { useEffect, useRef, useState } from "react";
import { classNames } from "primereact/utils";
import { Link } from "react-router-dom";
import AppMenu from "./AppMenu";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

export const AppTopBar2 = (props) => {
  const history = useHistory();
  try {
    var usuario;

    var conList = localStorage.getItem("user");

    if (conList !== "null" && conList !== null && conList !== "") {
      usuario = JSON?.parse(conList);
    } else {
      window.location = "#/login";
    }
  } catch (err) {
    window.location = "#/login";
  }

  const [appUsuario, setAppUsuario] = useState(usuario);
  function cerrar() {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
  }

  return (
    <div
      className="navbar navbar-expand-lg navbar-dark "
      style={{ background: "#343638" }}
    >
      <div className="container-xl">
        <div className="collapse navbar-collapse" id="navbarsExample07XL">
          <ul className="navbar-nav mr-auto">
            <li
              style={{
                fontSize: "20px",
                borderRight: "0.5px  solid #F2F2F2",
                marginRight: "5px",
                color: "white",
              }}
            >
              <p
                style={{
                  marginRight: "50px",
                }}
                className="nav-item active"
              >
                {appUsuario?.nombre + " " + appUsuario?.apellido + "  "}
              </p>
            </li>
            <li
              style={{
                fontSize: "20px",
                marginLeft: "15px",
                color: "white",
              }}
            >
              <p
                style={{
                  marginRight: "50px",
                }}
                className="nav-item active"
              >
                {appUsuario?.sucursal.nombre}
              </p>
            </li>
          </ul>
          <div className="form-inline  my-md-0 ">
            <Link
              to={{
                pathname: "/login",
              }}
            >
              <button
                className="p-link"
                style={{
                  height: "50px",
                  width: "200px",
                  marginTop: "14px",
                  marginBottom: "10px",
                  alignItems: "left",
                  justifyContent: "left",
                }}
                onClick={() => cerrar()}
              >
                <i
                  className="pi pi-sign-out mr-3"
                  style={{
                    fontSize: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    color: "white",
                  }}
                ></i>
                <label style={{ color: "white" }}>Cerrar sesion</label>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
