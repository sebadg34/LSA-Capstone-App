import Axios from "axios";
import jscookie from "js-cookie";
//import store from "@/store";
import config from '@/../public/config.json';
//import router from "@/router/index";
//import {
//  getRefreshToken
//} from "@/sistema/api-services/auth.service";
//import {
//  getUserInfo
//} from "@/sistema/api-services/auth.service";
//import {
//  setAuthToken
//} from "@/sistema/api-services/auth.service";
//import {
//  clearAuthToken
//} from "@/sistema/api-services/auth.service";
//import {
//  existRefreshToken
//} from "@/sistema/api-services/auth.service";
import { isLoggedIn } from "../api-services/Auth.service";
import userService from "@/helpers/api-services/Auth.service"
export async function crearApi() {




  const sisApi = Axios.create({
    baseURL: config.BASE_URL_SIS_API,
  });

  sisApi.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      //console.log("paso interceptor");

      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {

        console.log("etapa 403");

        userService.logout().then(() => {
          alert("El usuario ha sido bloqueado, cerrando sesión")
          window.location = '/';
        });
      } else if (error.response.status === 401) {
        console.log("etapa status 401")
        userService.logout().then(() => {
          alert("Sesión cerrada en servidor, ingrese nuevamente.")
          window.location = '/';
        });
      }
      return Promise.reject(error);
    });


  if (isLoggedIn()) {
    sisApi.defaults.headers.common["Authorization"] = await `Bearer ${jscookie.get("authToken")}`;
  }

  return sisApi;

}
