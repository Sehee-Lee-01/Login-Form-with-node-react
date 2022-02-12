import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  // server에 보냄
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  //reducer로 넘겨줌
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  // server에 보냄
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  //reducer로 넘겨줌
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  // server에 보냄
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);
  //reducer로 넘겨줌
  return {
    type: AUTH_USER,
    payload: request,
  };
}
