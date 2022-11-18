import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { classNames } from "primereact/utils";
//funciones
import onchangeObjet from "../../hooks/onchangeObjet";
import messageCampos from "../../hooks/messageCampos";
import dateNow from "../../hooks/dateNow";
//Servicios
import ProductoService from "../../service/AppServices/ProductoService";
import PedidiosService from "../../service/Pedidos/PedidiosService";
export const NuevoProducto = ({
  toast,
  setNuevoProducto,
  productoHook,
  estado,
  setEstado,
}) => {
  const message = useRef();

  let pedidosEmpty = {
    cant: 0,
    fecha: "",
    id: 0,
    proId: 0,
    producto: {
      fechaIngreso: "",
      id: 0,
      img: "",
      nombre: "",
      sucId: 0,
    },
    sucId: 0,
    usuId: 0,
  };
  const [producto, setProoducto] = useState(productoHook);
  const [submitted, setSubmitted] = useState(false);
  const [pedidos, setPedidos] = useState(pedidosEmpty);

  function save() {
    if (producto.nombre !== "") {
      const productoService = new ProductoService();

      var usuario = JSON?.parse(localStorage.getItem("user"));
      const _producto = { ...producto };

      _producto["sucId"] = usuario?.sucId;
      _producto["fechaIngreso"] = dateNow();

      productoService.save(_producto).then((response) => {
        const _pedidos = { ...pedidos };
        console.log(response);
        _pedidos["fecha"] = dateNow();
        _pedidos["sucId"] = usuario?.sucId;
        _pedidos["proId"] = response?.id;
        _pedidos["usuId"] = usuario?.id;
        _pedidos["producto"] = response;
        console.log(_pedidos);
        const pedidiosService = new PedidiosService();
        pedidiosService.findUseSave().then(() => {
          pedidiosService.save(_pedidos).then((res) => {
            console.log(res);
          });
        });

        setEstado(!estado);
        if (producto?.id === 0) {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Producto  creado",
            life: 4000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Tarea realizada con exito",
            detail: "Producto actualizada",
            life: 4000,
          });
        }
        setNuevoProducto(false);
        setSubmitted(false);
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
        <div className="grid  p-fluid">
          <div className="col-12">
            <label>Nombre del producto</label>
            <InputText
              value={producto?.nombre}
              type="text"
              onChange={(e) =>
                onchangeObjet(e, "nombre", producto, setProoducto)
              }
              className={classNames({
                "p-invalid": submitted && !producto?.nombre,
              })}
            />
            {submitted && !producto?.nombre && (
              <small className="p-invalid">Nombre del producto requerido</small>
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
          onClick={() => setNuevoProducto(false)}
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
