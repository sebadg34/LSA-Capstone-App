

import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const ingresarSolicitante = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/solicitantes/agregarSolicitante", data,
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
        const response = await axios.put(apiUrl + "/solicitantes/actualizarSolicitante/" +data.rut_solicitante, data, );
            console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
        return;
    }
};
const obtenerDetallesSolicitante = async (data) => {
    try {
        const response = await axios.get(apiUrl + "/solicitantes/" + data);
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
        const response = await axios.post(apiUrl + "/solicitantes/agregarCotizacion", data,
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
        const response = await axios.post(apiUrl + "/solicitantes/descargarCotizacion", data,{
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
        const response = await axios.post(apiUrl + "/solicitantes/eliminarCotizacion/" + data.rut_solicitante, data
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
        const response = await axios.get(apiUrl + "/solicitantes");
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
export default {
    ingresarSolicitante,
    obtenerTodosSolicitantes,
    agregarCotizacion,
    obtenerDetallesSolicitante,
    editarSolicitante,
    descargarCotizacion,
    eliminarCotizacion

};