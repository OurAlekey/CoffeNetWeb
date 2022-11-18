export default function onchangeObjet(e, name, obj, setObj) {
  const val = (e.target && e.target.value) || "";
  let _obj = { ...obj };
  _obj[`${name}`] = val.toUpperCase();
  setObj(_obj);
}
