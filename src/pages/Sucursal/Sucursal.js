import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
//Servicios
import SucursalService from "../../service/AppServices/SucursalService";

//fucniones
import onchangeObjet from "../../hooks/onchangeObjet";
//componentes
import { NuevaSucursal } from "./NuevaSucursal";

export const Sucural = () => {
  const toast = useRef();
  let filtroEmpty = {
    nombre: "",
  };
  let sucursalEmpty = {
    direccion: "",
    empId: 0,
    id: 0,
    nombre: "",
  };

  const [sucursal, setSucursal] = useState(sucursalEmpty);
  const [sucursales, setSucursales] = useState([]);
  const [filtro, setFiltro] = useState(filtroEmpty);
  const [nuevaSucursal, setNuevaSucursal] = useState(false);
  const [estado, setEstado] = useState(false);
  useEffect(() => {
    const sucursalesService = new SucursalService();
    sucursalesService.findByFil(filtro.nombre).then((response) => {
      setSucursales(response);
    });
  }, [filtro, estado]);
  function renderFilter() {
    return (
      <>
        <h4>Filtros</h4>
        <div className="grid p-fluid">
          <div className="col-3">
            <label>Nombre de la Sucursal</label>
            <InputText
              value={filtro.nombre}
              placeholder="sucursal1"
              onChange={(e) => onchangeObjet(e, "nombre", filtro, setFiltro)}
            />
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            <Button
              label="Nueva Sucursal"
              style={{
                width: "200px",
              }}
              className="p-button-success"
              icon="pi pi-external-link"
              onClick={() => (
                setNuevaSucursal(true), setSucursal(sucursalEmpty)
              )}
            />
          </div>
        </div>
      </>
    );
  }

  function acciones(rowData) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => (setNuevaSucursal(true), setSucursal(rowData))}
        />
      </>
    );
  }

  function renderTable() {
    return (
      <>
        <DataTable
          value={sucursales}
          emptyMessage="No se encontr ninguna sucursal"
          scrollable={true}
          scrollHeight="650px"
        >
          <Column field="id" header="Sucursal Id" />
          <Column field="nombre" header="Nombre de la sucursal" />
          <Column field="direccion" header="Direccion de la sucursal" />
          <Column header="Aciones" body={acciones} />
        </DataTable>
      </>
    );
  }

  return (
    <>
      <div className="card">{renderFilter()}</div>
      <div className="card">{renderTable()}</div>
      <Dialog
        visible={nuevaSucursal}
        header={sucursal.id === 0 ? "Nueva Sucursal" : "Editar Sucursal"}
        breakpoints={{ "960xp": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        onHide={() => setNuevaSucursal(false)}
      >
        <NuevaSucursal
          sucursalHook={sucursal}
          estado={estado}
          setEstado={setEstado}
          setNuevaSucursal={setNuevaSucursal}
          toast={toast}
        />
      </Dialog>
      <Toast ref={toast} />
    </>
  );
};
