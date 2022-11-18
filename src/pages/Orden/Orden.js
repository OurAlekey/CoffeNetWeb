import React, { useState, useEffect, useRef } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";

//servicios
import PedidiosService from "../../service/Pedidos/PedidiosService";
import HPedidiosService from "../../service/Pedidos/HPedidiosService";
//funciones
import dateNow from "../../hooks/dateNow";

export const Orden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesConst, setOrdenesConst] = useState([]);
  useEffect(() => {
    const pedidosService = new PedidiosService();
    pedidosService.findByFil().then((response) => {
      setOrdenes(response);
      setOrdenesConst(response);
    });
  }, []);

  function comparar(a, b) {
    return a.id - b.id;
  }

  const sumBt = (mon, item) => {
    var numero = objet(mon, item);

    var retornar = [];
    for (var i = 0; i < numero?.noModificado.length; i++) {
      retornar.push(numero?.noModificado[i]);
    }

    retornar.push(numero?.modificado);

    setOrdenes(retornar.sort(comparar));
  };

  const changeDatos = (mon, item, nombreCampo) => {
    var numero = objetInput(mon, item);

    var retornar = [];
    for (var i = 0; i < numero?.noModificado.length; i++) {
      retornar.push(numero?.noModificado[i]);
    }

    retornar.push(numero?.modificado);

    setOrdenes(retornar.sort(comparar));
  };

  let objetInput = (mon, id) => {
    return ordenes.reduce(
      (dato, producto) => {
        if (producto.id == id.id) {
          const _producto = { ...producto };
          _producto[`cant`] = Number(mon);

          dato.modificado = _producto;
        } else {
          dato.noModificado.push(producto);
        }
        return dato;
      },

      { modificado: {}, noModificado: [] }
    );
  };

  let objet = (mon, id) => {
    return ordenes.reduce(
      (dato, producto) => {
        if (producto.id == id.id) {
          const _producto = { ...producto };
          _producto[`cant`] += mon;

          dato.modificado = _producto;
        } else {
          dato.noModificado.push(producto);
        }
        return dato;
      },

      { modificado: {}, noModificado: [] }
    );
  };

  const listarOrden = () =>
    ordenes.map((item) => (
      <div className="md:col-4 lg:col-3 col-12">
        <div className="card shadow-sm">
          <img
            className="bd-placeholder-img card-img-top"
            key={item?.id}
            src={item?.producto?.img}
            alt="Cargar foto del producto"
            style={{
              borderRadius: "10px",
              border: "2px solid #f4f4f4",
            }}
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          />

          <div class="card-body">
            <h4 style={{ textAlign: "center" }}>{item?.producto?.nombre}</h4>
            <div className="p-inputgroup">
              <Button
                key={item?.id}
                icon="pi pi-minus"
                className="p-button-danger"
                onClick={(e) => sumBt(-1, item, "cant")}
              />
              <InputText
                style={{ textAlign: "center" }}
                type={"number"}
                key={item?.id}
                value={item?.cant}
                onChange={(e) => changeDatos(e.target.value, item, "cant")}
              />
              <Button
                icon="pi pi-plus"
                key={item?.id}
                className="p-button-success"
                onClick={(e) => sumBt(+1, item, "cant")}
              />
            </div>
          </div>
        </div>
      </div>
    ));

  function guardarHistorialPedidos() {
    const hPedidiosService = new HPedidiosService();

    ordenes.map(function (dato) {
      if (dato?.cant != 0 && dato?.cant != null) {
        var usuario = JSON?.parse(localStorage.getItem("user"));
        const _dato = { ...dato };
        _dato["estado"] = "N";
        _dato["id"] = 0;
        _dato["fecha"] = dateNow();
        _dato["usuario"] = usuario;

        hPedidiosService.findUseSave().then(() => {
          hPedidiosService.save(_dato).then(() => {
            setOrdenes(ordenesConst);
          });
        });
      }
    });
  }

  function botonPedir() {
    return (
      <>
        <Button
          icon="pi pi-shopping-cart"
          className="p-button-success"
          label="Ordenar"
          onClick={(e) => guardarHistorialPedidos()}
        />
      </>
    );
  }
  return (
    <>
      <div className="">
        <div style={{ textAlign: "right" }}>{botonPedir()}</div>
        <div className="grid p-fluid mt-2">{listarOrden()}</div>
      </div>
    </>
  );
};
