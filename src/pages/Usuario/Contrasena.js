import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

//service
import UsuarioService from "../../service/AppServices/UsuarioService";

export const Contrasena = ({
  contrasenaNueva,
  setContrasenaNueva,
  toast,
  nuevoUsuario,
}) => {
  const message = useRef();
  let emptyContrasena = {
    nuevaContrasena: "",
    confirmaContrasena: "",
  };

  const [nuevaContrasena, setNuevaContrasena] = useState(emptyContrasena);
  const [actualizarContrasena, setActualizarContrasena] =
    useState(nuevoUsuario);

  const onChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _nuevaContrasena = { ...nuevaContrasena };
    _nuevaContrasena[`${name}`] = val;
    setNuevaContrasena(_nuevaContrasena);
  };

  function save() {
    if (
      nuevaContrasena.nuevaContrasena !== "" &&
      nuevaContrasena.confirmaContrasena !== ""
    ) {
      if (
        nuevaContrasena.confirmaContrasena === nuevaContrasena.nuevaContrasena
      ) {
        let _actualizarContrasena = { ...nuevoUsuario };
        _actualizarContrasena[`contrasena`] = nuevaContrasena.nuevaContrasena;
        console.log(_actualizarContrasena);
        const usarioService = new UsuarioService();
        usarioService.save(_actualizarContrasena).then(() => {
          setContrasenaNueva(false);
          setNuevaContrasena(emptyContrasena);
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Contraseña actualizada",
            life: 4000,
          });
        });
      } else {
        setNuevaContrasena(emptyContrasena);
        message.current.show({
          severity: "warn",
          summary: "error",
          content: "Contraseña no coinciden",
          life: 4000,
        });
      }
    } else {
      setNuevaContrasena(emptyContrasena);
      message.current.show({
        severity: "warn",
        summary: "error",
        content: "Los campos deben estar llenos",
        life: 4000,
      });
    }
  }

  function botonesGuardado() {
    return (
      <>
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times "
          className="p-button-danger"
          onClick={() => (
            setContrasenaNueva(false),
            toast.current.show({
              severity: "error",
              summary: "Tarea cancelada",
              detail: "Contraseña no actualizada",
              life: 4000,
            })
          )}
        />

        <Button
          type="button"
          label="Guardar"
          icon="pi pi-upload "
          className="p-button-success"
          onClick={() => save()}
        />
      </>
    );
  }

  return (
    <>
      <Dialog
        visible={contrasenaNueva}
        header="Cambio de Contraseña"
        breakpoints={{ "960xp": "75vw", "640px": "100vw" }}
        style={{ width: "45vw" }}
        onHide={() => (
          setContrasenaNueva(false),
          // setNuevoUsuario(emptyUsuario),
          toast.current.show({
            severity: "error",
            summary: "Tarea cancelada",
            detail: "Usuario no creado / actualizado",
            life: 4000,
          })
          // setSubmitted(false)
        )}
        footer={botonesGuardado}
      >
        <div className="card">
          <div className="p-fluid grid  " autoComplete="off">
            <div className="col" autoComplete="off">
              <label> Nueva contraseña </label>
              <InputText
                value={nuevaContrasena.nuevaContrasena}
                type={"password"}
                autoComplete="off"
                onChange={(e) => onChange(e, "nuevaContrasena")}
                // className={classNames({
                //   "p-invalid": submitted && !nuevoUsuario.contrasena,
                // })}
              />
            </div>
            <div className="col" autoComplete="off">
              <label> Confirme la contraseña</label>
              <InputText
                value={nuevaContrasena.confirmaContrasena}
                type={"password"}
                autoComplete="off"
                onChange={(e) => onChange(e, "confirmaContrasena")}
                // className={classNames({
                //   "p-invalid": submitted && !nuevoUsuario.contrasena,
                // })}
              />
            </div>
          </div>
          <Messages ref={message} />
        </div>
      </Dialog>
    </>
  );
};
