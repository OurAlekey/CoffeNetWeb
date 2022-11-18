import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import AuthService from "../service/Auth/AuthService";
export const Login = () => {
  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let emptyUsr = {
    username: null,
    password: null,
  };

  const [usr, setUsr] = useState(emptyUsr);
  const [submitted, setSubmitted] = useState(false);
  const [estado, setEstado] = useState(false);

  const iniciarSesion = () => {
    setSubmitted(true);
    const authService = new AuthService();

    authService.login(usr).then((response) => {
      if (response === 403) {
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
        setEstado(false);
      } else if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        authService
          .getUser(usr.username, JSON.stringify(response.data))
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response));
            history.push("/");
            history.go();
            setEstado(true);
            setSubmitted(false);
          });
      }
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _usr = { ...usr };
    _usr[`${name}`] = val;
    setUsr(_usr);
  };

  const handleLogin = () => {
    iniciarSesion();
  };

  return (
    <div className="login" style={{ fontfamily: " Quicksand, sans-serif" }}>
      <div
        className="container rounded shadow"
        style={{ width: "450px", height: "65%" }}
      >
        <div className="row p-5">
          <div className="logo-center">
            <img src="assets/layout/images/pages/logo.ico" alt="CoffeNet" />
          </div>
          <h3 class="title">Iniciar Sesión</h3>

          <div className="mb-4">
            <label for="user" className="form-label">
              Usuario
            </label>

            <InputText
              placeholder="Usuario"
              value={usr.username || ""}
              onChange={(e) => onInputChange(e, "username")}
              required
              className={"form-control"}
            />
          </div>
          <div className="mb-4">
            <label for="clave" className="form-label">
              Contraseña
            </label>
            <InputText
              placeholder="Contraseña"
              type="password"
              value={usr.password || ""}
              onChange={(e) => onInputChange(e, "password")}
              required
              className={"form-control"}
            />
          </div>
          <div className="mb-4 d-grid">
            <Button
              label="LOGIN"
              type="button"
              onClick={handleLogin}
              className={
                classNames({
                  "p-invalid": submitted && !estado,
                }) || "btn btn-info"
              }
            ></Button>
          </div>
          {submitted && !estado && (
            <Message
              severity="error"
              text="* Por favor revisa tu usuario y contraseña."
            />
          )}
        </div>
      </div>
    </div>
  );
};
