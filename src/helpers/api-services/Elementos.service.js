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

const agregarMatriz = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/matrices/agregarMatriz", data,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerMetodologias = async () => {
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

const obtenerParametros = async () => {
    try {
         const response = await axios.get(apiUrl + "/parametros");
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

 const obtenerMatriz = async () => {
    try {
         const response = await axios.get(apiUrl + "/matrices");
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
        const response = await axios.put(apiUrl + "/metodologias/" + "/actualizarMetodologia/" + data.nombre_metodologia, data);
        
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

const actualizarParametro = async (data) => {
    try {
        console.log("DATA: ", data.nombre_metodologia);
        const response = await axios.put(apiUrl + "/parametros/" + "/actualizarParametro/" + data.nombre_parametro, data);      
        
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

const actualizarMatriz = async (data) => {
    try {
        console.log("DATA: ", data.nombre_metodologia);
        const response = await axios.put(apiUrl + "/matrices/" + "/actualizarMatriz/" + data.nombre_matriz, data);      
        
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

const obtenerDetallesParametro = async (data) => {
    try {
         const response = await axios.get(apiUrl + "/parametros/" + data.id_parametro, data);
        
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

 const obtenerDetallesMatriz = async (data) => {
    try { 
         const response = await axios.get(apiUrl + "/matrices/" + data.id_matriz, data);
        
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
    agregarParametro,
    actualizarParametro,
    obtenerDetallesParametro,
    obtenerParametros,
    agregarMatriz,
    actualizarMatriz,
    obtenerDetallesMatriz,
    obtenerMatriz

}