import {
    crearApi
} from "./InstanciadorAxios";




 const obtenerMuestras = async () => {
   try {
    const instanciaApi = await crearApi();
    const response = await instanciaApi.get("/muestras-supervisor");
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

const obtenerSubmuestras = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/submuestras/" + RUM);
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

 const obtenerResultadosAnalisis = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/resultadosAnalisis/"+RUM);
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

 const obtenerDetallesMuestra = async (RUM) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/muestras-supervisor/detallesMuestra/" + RUM);
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
 const obtenerObservaciones = async (RUM) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/muestras-supervisor/observacionesMuestra/" + RUM);
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

 const obtenerEmpleados = async () => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/empleados");
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
 const obtenerParametros = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/parametros/"+ RUM);
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

 const obtenerAnalistasDesignados = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/analistasDesignados/"+RUM);
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

 const ingresarResultadosAnalisis = async (data) => {
    try { 
        const instanciaApi = await crearApi(); 
        
        const response = await instanciaApi.post("/muestras-supervisor/ingresarResultadosAnalisis",data
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
 const descargarInforme = async (data) => {
    try { 
        const instanciaApi = await crearApi(); 
        
        const response = await instanciaApi.post("/muestras-supervisor/descargarInforme",data,{
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
const ingresarMuestra = async (data) => {
    try {  
        const instanciaApi = await crearApi(); 
        const response = await instanciaApi.post("/muestras-supervisor/ingresoMuestra",data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};



const marcarTareaComoCompletada = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.get("/muestras-supervisor/marcarTareaComoCompletada/"+RUM);
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

 const completarAnalisis = async (RUM) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.put("/muestras-supervisor/marcarAnalisisCompletado/"+RUM);
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
 const rehacerAnalisis = async (data) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.put("/muestras-supervisor/rehacerAnalisis", data);
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
 const modificarFechaEntrega = async (data) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.put("/muestras-supervisor/modificarFechaDeEntrega", data);
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


 const modificarAnalistas = async (data) => {
    try {
     const instanciaApi = await crearApi();
     const response = await instanciaApi.put("/muestras-supervisor/modificar_Analistas", data);
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
  
 const crearObservacionMuestra = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-supervisor/crearObservacion",data);
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

 
export default {
    rehacerAnalisis,
    obtenerMuestras,
    obtenerSubmuestras,
    obtenerEmpleados,
    obtenerObservaciones,
    obtenerDetallesMuestra,
    obtenerParametros,
    obtenerResultadosAnalisis,
    ingresarResultadosAnalisis,
    obtenerAnalistasDesignados,
    descargarInforme,
    ingresarMuestra,
    marcarTareaComoCompletada,
    completarAnalisis,
    modificarFechaEntrega,
    modificarAnalistas,
    crearObservacionMuestra

};