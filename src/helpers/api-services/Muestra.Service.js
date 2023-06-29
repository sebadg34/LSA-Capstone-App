import axios from "axios";
import config from '@/../public/config.json'
import {
    crearApi
} from "../api-services/InstanciadorAxios";



const apiUrl = config.BASE_URL_SIS_API;

const ingresarMuestra = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/recepcion-muestra", data,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerMuestras = async () => {
   try {
        const response = await axios.get(apiUrl + "/muestras");
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

const obtenerObservaciones = async (RUM) => {
    try {
         const response = await axios.get(apiUrl + "/muestras/" + RUM + "/observaciones");
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

 const obtenerDatosMuestra = async (RUM) => {
    try {
         const response = await axios.get(apiUrl + "/muestras/" + RUM);
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

 const obtenerTelefono = async (RUM) => {
    try {
         const response = await axios.get(apiUrl + "/muestras/" + RUM + "/telefonos");
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

 const actualizarMuestra = async (data) => {
    try {
        console.log("DATA: ", data.RUM);
        const response = await axios.put(apiUrl + "/muestras/" + data.RUM + "/update", data);
        
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


const completarMuestra = async (RUM) => {
    try {
        const response = await axios.put(apiUrl + "/muestras/" + RUM + "/completar");
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

const rehacerMuestra = async (RUM) => {
    try {
        const response = await axios.put(apiUrl + "/muestras/" + RUM + "/rehacer");
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


const calcularDiasTranscurridos = async (RUM) => {
    try {
      const response = await axios.get(apiUrl + "/muestras/" + RUM + "/dias-transcurridos");
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

const obtenerNombreEmpleados = async () => {
    try {
         const response = await axios.get(apiUrl + '/nombres-empleados');
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

 const obtenerDetallesSolicitante = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/solicitantes/" + data.rut_solicitante);
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
    ingresarMuestra,
    obtenerMuestras,
    obtenerObservaciones,
    obtenerDatosMuestra,
    obtenerTelefono,
    completarMuestra,
    rehacerMuestra,
    calcularDiasTranscurridos,
    obtenerNombreEmpleados,
    actualizarMuestra,
    obtenerDetallesSolicitante


};