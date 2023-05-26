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

export async function crearApi()
{
  



    const sisApi = Axios.create({
      baseURL:  config.BASE_URL_SIS_API,
    });
  if(isLoggedIn())
  {
    sisApi.defaults.headers.common["Authorization"] = await `Bearer ${jscookie.get("authToken")}`;
  }
  
  return sisApi;

}
