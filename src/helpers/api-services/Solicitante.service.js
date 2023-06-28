

import {
    crearApi
} from "../api-services/InstanciadorAxios";


const existeSolicitante = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/existeSolicitante", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};
const existeCorreoSolicitante = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/existeCorreo", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};
const ingresarSolicitante = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/agregarSolicitante", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const editarSolicitante = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/solicitantes/actualizarSolicitante/" +data.rut_solicitante, data, );
            console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        return;
    }
};
const obtenerDetallesSolicitante = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/solicitantes/" + data);
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
const obtenerDetallesCompletosSolicitante = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/solicitantes/detalles/" + data);
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
const agregarCotizacion = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/agregarCotizacion", data,
        {
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
const descargarCotizacion = async (data) => {
    try { 
        const instanciaApi = await crearApi(); 
        const response = await instanciaApi.post("/solicitantes/descargarCotizacion", data,{
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
const eliminarCotizacion = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/eliminarCotizacion/" + data.rut_solicitante, data
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const obtenerTodosSolicitantes = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/solicitantes");
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

const cambiarEstadoSolicitante = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/solicitantes/cambiarEstado", data);
            console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        return;
    }
};
export default {
    obtenerDetallesCompletosSolicitante,
    ingresarSolicitante,
    existeSolicitante,
    existeCorreoSolicitante,
    obtenerTodosSolicitantes,
    agregarCotizacion,
    obtenerDetallesSolicitante,
    editarSolicitante,
    descargarCotizacion,
    eliminarCotizacion,
    cambiarEstadoSolicitante

};