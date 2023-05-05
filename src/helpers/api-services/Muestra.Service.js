import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const ingresarMuestra = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/muestras", data,
            );
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

export function getPrioridad(prioridad) {
    if (prioridad === 1) {
      return "Normal";
    } else if (prioridad === 2) {
      return "Alta";
    } else if (prioridad === 3) {
      return "Urgente";
    } else {
      return "";
    }
  }



export default {
    ingresarMuestra,
    obtenerMuestras,
    obtenerObservaciones

};