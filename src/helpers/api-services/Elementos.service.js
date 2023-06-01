import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const agregarMetodología = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/metodologias/agregarMetodologia", data,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const agregarParametro = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/parametros/agregarParametro", data,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerMetodologias= async () => {
    try {
         const response = await axios.get(apiUrl + "/metodologias");
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

 const obtenerDetallesMetodologia = async (data) => {
    try {
         const response = await axios.get(apiUrl + "/metodologias/" + data.nombre_metodologia, data);
         console.log(response);
         if(response.status == 200){
             return response;
         } else {
             return;
         }
         
     } catch (error) {
         console.log(error);
         return;
     }
 };

 const actualizarMetodologia = async (data) => {
    try {
        console.log("DATA: ", data.nombre_metodologia);
        const response = await axios.put(apiUrl + "/metodologias/" + "actualizarMetodologia/" + data.nombre_metodologia, data);
        
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
};

const agregar_Empleados_Asociados = async (nombre_metodologia, data) => {
    try {  
        const response = await axios.post(apiUrl + "/metodologias/"+ nombre_metodologia + "/eliminarEmpleados" , data.nombre_metodologia,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const eliminar_Empleados_Asociados = async (nombre_metodologia, data) => {
    try {  
        const response = await axios.delete(apiUrl + "/metodologias/" + nombre_metodologia + "/eliminarEmpleados", {data: data}
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};


export default {

    agregarMetodología,
    obtenerMetodologias,
    actualizarMetodologia,
    agregar_Empleados_Asociados,
    eliminar_Empleados_Asociados,
    obtenerDetallesMetodologia,
    agregarParametro

}