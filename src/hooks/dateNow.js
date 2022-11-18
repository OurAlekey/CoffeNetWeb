export default function dateNow() {
  const event = new Date();
  var mm = event.getMonth() + 1;
  var dd = event.getDate();
  var yy = event.getFullYear();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  var myDateString = yy + "-" + mm + "-" + dd;
  return myDateString;
}
