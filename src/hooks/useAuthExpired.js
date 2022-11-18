import jwtDecode from "jwt-decode";

export default function useAuthExpired() {
  if (
    localStorage?.getItem("token") !== "null" &&
    localStorage?.getItem("token") !== null
  ) {
    const jwt_Token_decoded = jwtDecode(localStorage?.getItem("token"));
    if (jwt_Token_decoded.exp * 1000 < Date.now()) {
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
      return false;
    } else {
      return true;
    }
  } else if (localStorage?.getItem("token") === null) {
    return false;
  } else {
    return false;
  }
}
