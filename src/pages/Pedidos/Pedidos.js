import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import HPedidiosService from "../../service/Pedidos/HPedidiosService";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
//funciones
import formatDate from "../../hooks/formatDate";
export const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [estadoU, setEstadoU] = useState(false);

  useEffect(() => {
    const hPedidiosService = new HPedidiosService();
    hPedidiosService.findByFilNuevo().then((response) => {
      setPedidos(response);
    });
    prin();
  }, []);

  function prin() {
    (function loop() {
      setTimeout(function () {
        const hPedidiosService = new HPedidiosService();
        hPedidiosService.findByFilNuevo().then((response) => {
          setPedidos(response);
        });
        loop();
      }, 7000);
    })();
  }
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
  function fechaTable(rowData) {
    return <>{formatDate(rowData.fecha)}</>;
  }
  return (
    <>
      <div className="card mt-2 mr-2">
        <h3 className="mt-2">Pedidos</h3>
        <DataTable
          className="mt-2 mr-4 ml-4"
          value={pedidos}
          emptyMessage="Sin pedidos"
          scrollable={true}
          scrollHeight="780px"
        >
          <Column header="Pedido No." field="id" />
          <Column header="Feccha de pedido" body={fechaTable} />
          <Column header="Cantidad" field="cant" />
          <Column header="Producto" field="producto.nombre" />
          <Column header="Estado" body={estado} />
          <Column header="Usuario quien solicita" body={usuarioSoli} />
          <Column header="Cambiar estado" body={resuelto} />
        </DataTable>
      </div>
    </>
  );
};
