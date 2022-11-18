import React, { useState } from "react";
import "../../utils/App.css";

import Cropper from "react-easy-crop";
import { Button } from "primereact/button";

import ProductoService from "../../service/AppServices/ProductoService";

export const CargarImagen = ({
  productoHook,
  setCargarImanen,
  toasta,
  estado,
  setEstado,
}) => {
  const inputRef = React.useRef();

  const [producto, setProducto] = useState(productoHook);
  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    );

    return canvas;
  }
  var base64data;
  const generateDownload = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }

    const canvas = await getCroppedImg(imageSrc, crop);

    canvas.toBlob(
      (blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          base64data = reader.result;

          let _producto = { ...producto };
          _producto[`${"img"}`] = base64data;
          const productoService = new ProductoService();
          productoService.save(_producto).then(() => {
            setCargarImanen(false);
            setEstado(!estado);
          });
        };
      },
      "image/jpeg",
      0.66
    );
  };

  return (
    <div>
      <div className="container">
        <div
          className="container-cropper"
          style={{ backgroundColor: "#575757" }}
        >
          {image ? (
            <>
              <div className="cropper">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={7 / 8}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            </>
          ) : null}
        </div>
        <div className="container-buttons mt-5  ">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
            style={{ display: "none" }}
          />
          <Button
            label="Seleccionar"
            icon="pi pi-image"
            iconPos="right"
            variant="contained"
            className="p-button-rounded p-button-secondary"
            onClick={triggerFileSelectPopup}
            style={{ marginRight: "10px" }}
          />
          <Button
            label="Subir"
            icon="pi pi-cloud-upload"
            iconPos="right"
            variant="contained"
            className="p-button-rounded p-button-success"
            onClick={onDownload}
          />
        </div>
      </div>
    </div>
  );
};
