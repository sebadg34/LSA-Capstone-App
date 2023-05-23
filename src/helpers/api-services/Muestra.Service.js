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

 const obtenerFonos = async (RUM) => {
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


  
 
export default {
    ingresarMuestra,
    obtenerMuestras,
    obtenerObservaciones,
    obtenerDatosMuestra,
    obtenerFonos,
    completarMuestra,
    rehacerMuestra,
    calcularDiasTranscurridos,
    obtenerNombreEmpleados

};