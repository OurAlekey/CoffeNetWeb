export default function formatDate(value) {
  const event = new Date(value);
  var mm = event.getMonth() + 1;
  var dd = event.getDate() + 1;
  var yy = event.getFullYear();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  var myDateString = dd + "/" + mm + "/" + yy;
  return myDateString;
}
