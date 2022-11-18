import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { Messages } from "primereact/messages";
import { classNames } from "primereact/utils";
//Servicios
import UsuarioService from "../../service/AppServices/UsuarioService";
import SucursalService from "../../service/AppServices/SucursalService";

//Componentes
import { Contrasena } from "./Contrasena";

//Funciones
import formatDate from "../../hooks/formatDate";
export const Usuario = () => {
  const toast = useRef();
  const message = useRef();
  let emptyFilter = {
    usuario: "",
    nombre: "",
    apellido: "",
  };

  let emptyUsuario = {
    apellido: "",
    contrasena: "",
    estado: "A",
    fechaNacimiento: "",
    id: 0,
    nombre: "",
    sucId: 0,
    usuario: "",
  };
  const [nuevoUsuario, setNuevoUsuario] = useState(emptyUsuario);
  const [filtro, setFiltro] = useState(emptyFilter);
  const [usuarios, setUsuario] = useState([]);
  const [nuevo, setNuevo] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const [estadoUseEfect, setEstadoUseEfect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contrasenaNueva, setContrasenaNueva] = useState(false);
  useEffect(() => {
    const usarioService = new UsuarioService();
    usarioService
      .findByFil(filtro.usuario, filtro.nombre, filtro.apellido)
      .then((response) => {
        setUsuario(response);
      });
  }, [filtro.usuario, filtro.nombre, filtro.apellido, estadoUseEfect]);

  useEffect(() => {
    const sucursalService = new SucursalService();
    sucursalService.findAll().then((response) => {
      setSucursales(response);
    });
  }, []);

  function estado(rowData) {
    return <>{rowData.estado == "A" ? "Activo" : "Inactivo"}</>;
  }

  function acciones(rowData) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => (setNuevo(true), setNuevoUsuario(rowData))}
        />
        <Button
          icon="pi pi-lock"
          className="p-button-rounded"
          onClick={() => (setContrasenaNueva(true), setNuevoUsuario(rowData))}
        />
      </>
    );
  }

  const onChangefiltro = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _filtro = { ...filtro };
    _filtro[`${name}`] = val;
    setFiltro(_filtro);
  };
  const onChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let __nuevoUsuario = { ...nuevoUsuario };
    __nuevoUsuario[`${name}`] = val;
    setNuevoUsuario(__nuevoUsuario);
  };

  const onInputChangeRecCheckbox = (e, name) => {
    const val = e;
    let __nuevoUsuario = { ...nuevoUsuario };
    __nuevoUsuario[`${name}`] = val;

    setNuevoUsuario(__nuevoUsuario);
  };

  const onInputChangeRegObject = (e, name, value, key) => {
    const val = (e.target && e.target.value) || "";
    let _usuario = { ...nuevoUsuario };
    _usuario[`${name}`] = val;
    _usuario[`${key}`] = value;
    setNuevoUsuario(_usuario);
  };

  function save() {
    if (
      nuevoUsuario.apellido !== "" &&
      nuevoUsuario.nombre !== "" &&
      nuevoUsuario.fechaNacimiento !== "" &&
      nuevoUsuario.contrasena !== "" &&
      nuevoUsuario.usuario !== "" &&
      nuevoUsuario.sucId !== 0 &&
      nuevoUsuario.sucId !== ""
    ) {
      const usarioService = new UsuarioService();
      usarioService.save(nuevoUsuario).then(() => {
        var estadoReturn = estadoUseEfect === true ? false : true;
        setEstadoUseEfect(estadoReturn);
        setNuevoUsuario(emptyUsuario);
        setNuevo(false);
        setSubmitted(false);

        if (nuevoUsuario.id == 0) {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Nuevo usuario creado",
            life: 4000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Usuario actualizado",
            life: 4000,
          });
        }
      });
    } else {
      setSubmitted(true);
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
            setNuevo(false),
            setNuevoUsuario(emptyUsuario),
            toast.current.show({
              severity: "error",
              summary: "Tarea cancelada",
              detail: "Usuario no creado / actualizado",
              life: 4000,
            }),
            setSubmitted(false)
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
  function formatDateTable(rowData) {
    return <> {formatDate(rowData.fechaNacimiento)}</>;
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="grid  ">
            <div className="col">
              <h4>Filtros</h4>
            </div>
            <div
              className="col"
              style={{ textAlign: "right", alignItems: "right" }}
            >
              <Button
                label="Nuevo Usuario"
                style={{
                  width: "200px",
                }}
                className="p-button-success"
                icon="pi pi-external-link"
                onClick={() => (setNuevo(true), setNuevoUsuario(emptyUsuario))}
              />
            </div>
          </div>

          <div className="foirmgrid grid" autoComplete="off">
            <div className="col-2">
              <label>Usuario</label>
              <InputText
                className={"form-control"}
                value={filtro.usuario}
                autoComplete="off"
                onChange={(e) => onChangefiltro(e, "usuario")}
              />
            </div>
            <div className="col-3">
              <label>Nombre</label>
              <InputText
                className={"form-control"}
                value={filtro.nombre}
                autoComplete="off"
                onChange={(e) => onChangefiltro(e, "nombre")}
              />
            </div>
            <div className="col-3">
              <label>Apellido</label>
              <InputText
                className={"form-control"}
                value={filtro.apellido}
                autoComplete="off"
                onChange={(e) => onChangefiltro(e, "apellido")}
              />
            </div>
          </div>
        </div>

        <div className="card ">
          <div className="">
            <div>
              <h4 className="">Usuarios</h4>
              <DataTable
                value={usuarios}
                emptyMessage="No se encontraron usarios"
                paginator
                rows={10}
              >
                <Column field="id" header="Id" />
                <Column field="nombre" header="Nombre" />
                <Column field="apellido" header="Apellido" />
                <Column
                  field="fechaNacimiento"
                  header="Fecha de Nacimiento"
                  body={formatDateTable}
                />
                <Column field="usuario" header="Usuario" />
                <Column field="sucursal.nombre" header="Sucursal" />
                <Column body={estado} header="Estado" />
                <Column body={acciones} header="Acciones" />
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={nuevo}
        header="Nuevo Usuario"
        breakpoints={{ "960xp": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        onHide={() => (
          setNuevo(false),
          setNuevoUsuario(emptyUsuario),
          toast.current.show({
            severity: "error",
            summary: "Tarea cancelada",
            detail: "Usuario no creado / actualizado",
            life: 4000,
          }),
          setSubmitted(false)
        )}
        footer={botonesGuardado}
      >
        <div className="card p-fluid">
          <div className="grid">
            <div className="col">
              <label>Nombre</label>
              <InputText
                value={nuevoUsuario.nombre}
                autoComplete="off"
                onChange={(e) => onChange(e, "nombre")}
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.nombre,
                })}
              />
              {submitted && !nuevoUsuario.nombre && (
                <small className="p-invalid"> Nombre requerido.</small>
              )}
            </div>
            <div className="col">
              <label>Apellido</label>
              <InputText
                value={nuevoUsuario.apellido}
                autoComplete="off"
                onChange={(e) => onChange(e, "apellido")}
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.apellido,
                })}
              />
              {submitted && !nuevoUsuario.apellido && (
                <small className="p-invalid"> Apellido requerido.</small>
              )}
            </div>
          </div>
          <div className=" grid">
            <div className="col">
              <label>Fecha de Nacimiento</label>
              <InputText
                value={nuevoUsuario.fechaNacimiento}
                autoComplete="off"
                type={"date"}
                onChange={(e) => onChange(e, "fechaNacimiento")}
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.fechaNacimiento,
                })}
              />
              {submitted && !nuevoUsuario.fechaNacimiento && (
                <small className="p-invalid">
                  Fecha de nacimiento requerida.
                </small>
              )}
            </div>
            <div className="col">
              <label>Usuario</label>
              <InputText
                value={nuevoUsuario.usuario}
                autoComplete="off"
                onChange={(e) => onChange(e, "usuario")}
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.usuario,
                })}
              />
              {submitted && !nuevoUsuario.usuario && (
                <small className="p-invalid">Usuario Requerido</small>
              )}
            </div>
          </div>
          <div className=" grid">
            <div
              className="col"
              style={{ display: nuevoUsuario.id !== 0 ? "none" : "" }}
            >
              <label>Contraseña</label>
              <InputText
                value={nuevoUsuario.contrasena}
                autoComplete="false"
                type={"password"}
                onChange={(e) => onChange(e, "contrasena")}
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.contrasena,
                })}
              />
              {submitted && !nuevoUsuario.contrasena && (
                <small className="p-invalid">Contraseña requerida</small>
              )}
            </div>
            <div
              className="col mt-3"
              style={{ textAlign: "center", alignItems: "center" }}
            >
              <label className="">Estado</label>
              <div
                className="field-checkbox"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <Checkbox
                  header="Estado"
                  inputId="checkOption1"
                  name="option"
                  className=" ml-3 mr-2 mb-1"
                  checked={nuevoUsuario.estado === "I" ? false : true}
                  onChange={(e) =>
                    onInputChangeRecCheckbox(
                      e.target.checked === true ? "A" : "I",
                      "estado"
                    )
                  }
                />
                <label htmlFor="checkOption1">
                  {nuevoUsuario.estado === "A" ? "Activo" : "Inactivo"}
                </label>
              </div>
            </div>
          </div>
          <div className="formgrid grid">
            <div className="col">
              <label>Sucuarsal</label>
              <Dropdown
                value={nuevoUsuario.sucursal}
                options={sucursales}
                onChange={(e) =>
                  onInputChangeRegObject(e, "sucursal", e.value.id, "sucId")
                }
                optionLabel="nombre"
                placeholder="Seleccione una sucursal"
                className={classNames({
                  "p-invalid": submitted && !nuevoUsuario.sucId,
                })}
              />
            </div>
          </div>
          <Messages ref={message} />
        </div>
      </Dialog>

      <Toast ref={toast} />
      <Contrasena
        contrasenaNueva={contrasenaNueva}
        setContrasenaNueva={setContrasenaNueva}
        toast={toast}
        nuevoUsuario={nuevoUsuario}
      />
    </div>
  );
};
