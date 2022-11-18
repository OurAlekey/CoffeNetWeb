import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import HPedidiosService from "../../service/Pedidos/HPedidiosService";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
//funciones
import formatDate from "../../hooks/formatDate";
export const HistoryPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const hPedidiosService = new HPedidiosService();
    hPedidiosService.findByFilResuelto(pageNumber).then((response) => {
      setPedidos(response?.content);
      setTotalPages(response.totalPages);
      setFirstPage(response.first);
      setLastPage(response.last);
    });
  }, [pageNumber]);

  function estado(rowData) {
    return <>{rowData.estado == "N" ? "NUEVO" : "RESUELTO"}</>;
  }

  function usuarioSoli(rowData) {
    return (
      <>
        {rowData?.usuario.nombre} {rowData?.usuario.apellido}
      </>
    );
  }

  function resuelto(rowData) {
    return (
      <>
        <Button label="resuelto" onClick={() => cambiarEstado(rowData)} />
      </>
    );
  }

  function cambiarEstado(data) {
    const hPedidiosService = new HPedidiosService();
    const _data = { ...data };
    _data["estado"] = "R";

    hPedidiosService.save(_data).then(() => {
      const hPedidiosService = new HPedidiosService();
      hPedidiosService.findByFilNuevo().then((response) => {
        setPedidos(response);
      });
    });
  }

  const renderPaginacion = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <Button
          type="button"
          label=""
          icon="pi pi-angle-double-left"
          className="p-button-outlined p-button-secondary "
          style={{
            background: "transparent; color: #6E707A",
            marginRight: "4px",
            border: "none",
          }}
          disabled={firstPage}
          onClick={() => setPageNumber(0)}
        />
        <Button
          type="button"
          label=""
          icon="pi pi-angle-left"
          className="p-button-outlined p-button-secondary "
          style={{
            background: "transparent; color: #6E707A",
            marginRight: "4px",
            border: "none",
          }}
          disabled={firstPage}
          onClick={() => setPageNumber(pageNumber - 1)}
        />

        <InputText
          type="text"
          className="p-inputtext p-component"
          placeholder={pageNumber + 1 + " de " + totalPages}
          style={{
            width: "100px",
            height: "30px",
            borderColor: "#5499C7",
            textAlign: "center",
            fontSize: "15px",
            background: "transparent",
          }}
          readOnly
        />

        <Button
          type="button"
          label=""
          className="p-button-outlined p-button-secondary "
          icon="pi pi-angle-right"
          style={{
            background: "transparent; color: #5499C7",
            marginRight: "4px",
            border: "none",
          }}
          disabled={lastPage}
          onClick={() => setPageNumber(pageNumber + 1)}
        />

        <Button
          type="button"
          label=""
          className="p-button-outlined p-button-secondary "
          icon="pi pi-angle-double-right"
          style={{
            background: "transparent; color: #6E707A",
            marginRight: "4px",
            border: "none",
          }}
          disabled={lastPage}
          onClick={() => setPageNumber(totalPages - 1)}
        />
      </div>
    );
  };

  function fechaTable(rowData) {
    return <>{formatDate(rowData.fecha)}</>;
  }
  return (
    <>
      <div className="card mt-2 mr-2">
        <h3 className="mt-2">Pedidos Ya echos</h3>
        <DataTable
          className="mt-2 mr-4 ml-4"
          value={pedidos}
          emptyMessage="Sin pedidos"
          footer={renderPaginacion}
        >
          <Column header="Pedido No." field="id" />
          <Column header="Feccha de pedido" body={fechaTable} />
          <Column header="Cantidad" field="cant" />
          <Column header="Producto" field="producto.nombre" />
          <Column header="Estado" body={estado} />
          <Column header="Usuario quien solicito" body={usuarioSoli} />
        </DataTable>
      </div>
    </>
  );
};
