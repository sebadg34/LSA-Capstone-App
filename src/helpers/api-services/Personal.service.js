
//import config from '@/../public/config.json'
import {
    crearApi
} from "../api-services/InstanciadorAxios";



const ingresarPersonal = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empleados/agregarEmpleado", data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const descargarDocumento = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empleados/descargarDocumento", data,{
            responseType: 'blob',
        }
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const eliminarDocumento = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.delete("/empleados/eliminarDocumentoEmpleado", {data: data}
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const obtenerTodosPersonal = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/empleados", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') //the token is a variable which holds the token
              }
        });
            console.log(response);
        if(response.status == 200){
            return response;
        }else{
            return;
        }
        
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerDetallesPersonal = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/empleados/detallesEmpleado/" + data);
            console.log(response);
        if(response.status == 200){
            return response;
        }else{
            return;
        }
        
    } catch (error) {
        console.log(error);
        return;
    }
};


const cambiarEstadoPersonal = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empleados/cambiarEstado", data);
            console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        return;
    }
};

const editarPersonal = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empleados/editarEmpleado", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        });
            console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        return;
    }
};
export default {
    ingresarPersonal,
    obtenerTodosPersonal,
    cambiarEstadoPersonal,
    editarPersonal,
    obtenerDetallesPersonal,
    eliminarDocumento,
    descargarDocumento

};