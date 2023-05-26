import axios from "axios";
import config from '@/../public/config.json'
import jscookie from "js-cookie";


var apiInstance;
async function crearApi() {
    apiInstance = axios.create({
        baseURL: config.BASE_URL_SIS_API,
    });
    setHeader();
}
function setHeader()
  {

    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${jscookie.get("authToken")}`;
  }


//const baseUrl = config.BSE_URL;
export async function clearAuthToken() {
    await crearApi();
    apiInstance.defaults.headers.common['Authorization'] = ''
    jscookie.remove('authToken');
}

export async function setAuthToken(token) {
    await crearApi();
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    jscookie.set('authToken', token, { sameSite: 'none', secure: true });
}


export function getAuthToken() {
    return jscookie.get('authToken');
    //return localStorage.getItem(AUTH_TOKEN_KEY);   
}

export function getUserInfo() {
  
    return JSON.parse(jscookie.get('userInfo')) ;
  }
  export function saveUserInfo(data) {
  
    jscookie.set('userInfo',JSON.stringify(data), { sameSite: 'none', secure: true });
  }


const login = async (data) => {
    try {
        await crearApi();
        const response = await apiInstance.post("/login", data);
        if (response.status) {
            console.log(response);
            setAuthToken(response.data.token);
            saveUserInfo(response.data.user);
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            return response;
        }
        else {
            console.log(response);
            return;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}

export function isLoggedIn() {
    let authToken = getAuthToken();
    return !!authToken;
}

const register = async () => {
    try {
        const response = await apiInstance.get('http://127.0.0.1:8000/api/register');
        console.log(response);
        if (response.status == 200) {
            return response;
        } else {
            return;
        }

    } catch (error) {
        console.log(error);
        return;
    }
}


const logout = async () => {
    try {
        crearApi();
        const response = await apiInstance.post('http://127.0.0.1:8000/api/logout');
        await clearAuthToken();
        console.log(response);
        if (response.status == 200) {
            return response;
        } else {
            return;
        }

    } catch (error) {
        console.log(error);
        return;
    }
}
export default {
    login,
    register,
    logout,
    isLoggedIn

};