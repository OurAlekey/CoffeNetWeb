import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Messages } from "primereact/messages";
import { classNames } from "primereact/utils";
//Servicios
import EmpresaService from "../../service/AppServices/EmpresaService";
import SucursalService from "../../service/AppServices/SucursalService";
//Funciones
import onChangeDropObjt from "../../hooks/onChangeDropObjt";
import onchangeObjet from "../../hooks/onchangeObjet";
import messageCampos from "../../hooks/messageCampos";
export const NuevaSucursal = ({
  sucursalHook,
  estado,
  setEstado,
  setNuevaSucursal,
  toast,
}) => {
  const message = useRef();
  const [sucursal, setSucursal] = useState(sucursalHook);
  const [empresas, setEmpresas] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const empresaService = new EmpresaService();
    empresaService.findAll().then((response) => {
      setEmpresas(response);
    });
  }, []);

  function save() {
    if (sucursal?.direccion && sucursal.nombre !== "" && sucursal.empId) {
      const sucursalService = new SucursalService();
      sucursalService.save(sucursal).then((res) => {
        console.log(res);
        setEstado(!estado);
        setNuevaSucursal(false);
        if (sucursal?.id === 0) {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Sucursal  creada",
            life: 4000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Sucursal Actualizada",
            life: 4000,
          });
        }
      });
    } else {
      setSubmitted(true);
      setInterval(() => {
        setSubmitted(false);
      }, 4000);
      messageCampos(message);
    }
  }

  return (
    <>
      <div className="card">
        <div className="grid p-fluid">
          <div className="col">
            <label>Nombre de la sucursal</label>
            <InputText
              value={sucursal?.nombre}
              placeholder="Sucursal 2"
              onChange={(e) =>
                onchangeObjet(e, "nombre", sucursal, setSucursal)
              }
              className={classNames({
                "p-invalid": submitted && !sucursal?.nombre,
              })}
            />
            {submitted && !sucursal?.nombre && (
              <small className="p-invalid">
                Nombre de la sucursal Requerida
              </small>
            )}
          </div>
        </div>
        <div className="grid p-fluid">
          <div className="col">
            <label>Direccion</label>
            <InputTextarea
              rows={4}
              value={sucursal?.direccion}
              placeholder="Avenida Siempre viva"
              onChange={(e) =>
                onchangeObjet(e, "direccion", sucursal, setSucursal)
              }
              className={classNames({
                "p-invalid": submitted && !sucursal?.direccion,
              })}
            />
            {submitted && !sucursal?.direccion && (
              <small className="p-invalid">Direccion Requerida</small>
            )}
          </div>
        </div>
        <div className="grid p-fluid">
          <div className="col">
            <label>Empresa</label>
            <Dropdown
              value={sucursal?.empresa}
              options={empresas}
              optionLabel="nombre"
              placeholder="Seleccione una Empresa"
              onChange={(e) =>
                onChangeDropObjt(
                  e,
                  "empresa",
                  e.value.id,
                  "empId",
                  sucursal,
                  setSucursal
                )
              }
              className={classNames({
                "p-invalid": submitted && !sucursal?.empId,
              })}
            />
            {submitted && !sucursal?.empId && (
              <small className="p-invalid">Seleccone una Empresa</small>
            )}
          </div>
        </div>
      </div>
      <Messages ref={message} />
      <div style={{ textAlign: "right" }}>
        <Button
          icon="pi pi-times"
          label="Cancelar"
          className="p-button-raised p-button-danger mr-2"
          onClick={() => setNuevaSucursal(false)}
        />
        <Button
          icon="pi pi-check"
          label="Guardar"
          className="p-button-raised"
          onClick={() => save()}
        />
      </div>
    </>
  );
};
