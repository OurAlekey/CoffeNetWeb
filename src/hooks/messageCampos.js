export default function messageCampos(hrefMenssage) {
  return hrefMenssage.current.show({
    severity: "warn",
    summary: "error",
    content: "Verifique que tenga los campos suficientes esten completos",
    life: 4000,
  });
}
