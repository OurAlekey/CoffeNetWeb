export default function onChangeDropObjt(e, name, value, key, obj, setObj) {
  const val = (e.target && e.target.value) || "";
  let _obj = { ...obj };
  _obj[`${name}`] = val;
  _obj[`${key}`] = value;
  setObj(_obj);
}
