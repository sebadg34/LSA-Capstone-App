

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
const actualizarEmpresa = async (data) => {
    try {  
        const response = await axios.put(apiUrl + "/empresas/actualizarEmpresa/"+data.rut_empresa, data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerDetallesEmpresa = async (data) => {
    try {
        const response = await axios.get(apiUrl + "/empresas/"+data);
        console.log(response);
    if(response.status == 200){
        return response;
    }else{
        return;
    }
    } catch (error){
        console.log(error);
        return;
    }
}
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
    obtenerDetallesEmpresa,
    actualizarEmpresa

};