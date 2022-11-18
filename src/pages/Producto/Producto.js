import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
//Servicios
import ProductoService from "../../service/AppServices/ProductoService";
import { NuevoProducto } from "./NuevoProducto";
//fucniones
import onchangeObjet from "../../hooks/onchangeObjet";
import formatDate from "../../hooks/formatDate";
import { CargarImagen } from "./CargarImagen";
export const Producto = () => {
  const toast = useRef();
  let filtroEmpty = {
    nombre: "",
  };
  let productoEmpty = {
    fechaIngreso: "",
    id: 0,
    img: "",
    nombre: "",
    sucId: 0,
  };

  const [filtro, setFiltro] = useState(filtroEmpty);
  const [nuevoProducto, setNuevoProducto] = useState(false);
  const [producto, setProducto] = useState(productoEmpty);
  const [productos, setProductos] = useState([]);
  const [estado, setEstado] = useState(false);
  const [cargarImagen, setCargarImanen] = useState(false);
  useEffect(() => {
    const productoService = new ProductoService();
    productoService.findByFil(filtro.nombre).then((response) => {
      setProductos(response);
    });
  }, [estado, filtro.nombre]);

  function renderFilter() {
    return (
      <>
        <h4>Filtros</h4>
        <div className="grid p-fluid">
          <div className="col-3">
            <label>Nombre del producto</label>
            <InputText
              value={filtro.nombre}
              placeholder="CAFFE"
              onChange={(e) => onchangeObjet(e, "nombre", filtro, setFiltro)}
            />
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            <Button
              label="Nueo producto"
              style={{
                width: "200px",
              }}
              className="p-button-success"
              icon="pi pi-external-link"
              onClick={() => (
                setNuevoProducto(true), setProducto(productoEmpty)
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
          tooltip="Editar"
          onClick={() => (setNuevoProducto(true), setProducto(rowData))}
        />
        <Button
          icon="pi pi-camera"
          className="p-button-rounded p-button-info mr-2"
          tooltip="Cargar Imagen"
          onClick={() => (setCargarImanen(true), setProducto(rowData))}
        />
      </>
    );
  }
  function formatDateTable(rowData) {
    return <>{formatDate(rowData?.fechaIngreso)}</>;
  }

  function img(rowData) {
    return (
      <>
        <img
          src={rowData?.img}
          width="110"
          height="120"
          alt="Cargar foto del producto"
          style={{
            "border-radius": "10px",
            border: "3px solid #575757",
          }}
        />
      </>
    );
  }
  function renderTable() {
    return (
      <>
        <DataTable
          value={productos}
          emptyMessage="No se encontro ningun producto"
          scrollable={true}
          scrollHeight="650px"
          paginator
          rows={5}
        >
          <Column field="id" header="Prudcto Id" />
          <Column
            body={formatDateTable}
            field="fechaIngreso"
            header="Fecha de Ingreso"
          />

          <Column field="nombre" header="Nombre del producto" />
          <Column body={img} header="Imagen del producto" />
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
        visible={nuevoProducto}
        header={producto.id === 0 ? "Nuevo producto" : "Editar producto"}
        breakpoints={{ "960xp": "75vw", "640px": "100vw" }}
        style={{ width: "50vw" }}
        onHide={() => setNuevoProducto(false)}
      >
        <NuevoProducto
          setNuevoProducto={setNuevoProducto}
          productoHook={producto}
          toast={toast}
          estado={estado}
          setEstado={setEstado}
        />
      </Dialog>

      <Dialog
        visible={cargarImagen}
        header="Cargar Imagen"
        style={{ width: "53vw" }}
        onHide={() => setCargarImanen(false)}
        maximizable
      >
        <CargarImagen
          setCargarImanen={setCargarImanen}
          productoHook={producto}
          toast={toast}
          estado={estado}
          setEstado={setEstado}
        />
      </Dialog>
      <Toast ref={toast} />
    </>
  );
};
