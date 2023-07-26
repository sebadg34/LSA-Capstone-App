
import config from '@/../public/config.json'
import {
    crearApi
} from "../api-services/InstanciadorAxios";



const apiUrl = config.BASE_URL_SIS_API;

const ingresarMuestra = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post(apiUrl + "/recepcion-muestra", data,);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerMuestras = async () => {
   try {
    const instanciaApi = await crearApi();
    const response = await instanciaApi.get(apiUrl + "/muestras");
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


const obtenerEmpresas = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get(apiUrl + "/recepcion-muestra/empresa-ciudades-direcciones");
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
        const instanciaApi = await crearApi();
     const response = await instanciaApi.get(apiUrl + "/muestras/" + RUM + "/observaciones");
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
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get(apiUrl + "/ingreso-muestra/detallesMuestra/" + RUM);
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
        const instanciaApi = await crearApi();
     const response = await instanciaApi.get(apiUrl + "/muestras/" + RUM + "/telefonos");
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
        const instanciaApi = await crearApi();
        const response = await instanciaApi.put(apiUrl + "/ingreso-muestra", data);
        
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
        const instanciaApi = await crearApi();
     const response = await instanciaApi.put(apiUrl + "/muestras/" + RUM + "/completar");
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
        const instanciaApi = await crearApi();
     const response = await instanciaApi.put(apiUrl + "/muestras/" + RUM + "/rehacer");
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
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get(apiUrl + "/muestras/" + RUM + "/dias-transcurridos");
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
        const instanciaApi = await crearApi();
     const response = await instanciaApi.get(apiUrl + '/nombres-empleados');
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

const obtenerDireccionEmpresa = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/recepcion-muestra/empresa-ciudades/" + data.rut_empresa);
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

const obtenerCotizacionEmpresa = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/recepcion-muestra/cotizaciones/" + data.rut_empresa);
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
    obtenerDetallesSolicitante,
    obtenerDireccionEmpresa,
    obtenerCotizacionEmpresa,
    obtenerEmpresas


};