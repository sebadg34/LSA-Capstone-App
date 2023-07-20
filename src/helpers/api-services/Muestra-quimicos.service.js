import {
    crearApi
} from "./InstanciadorAxios";




 const obtenerMuestras = async () => {
   try {
    const instanciaApi = await crearApi();
    const response = await instanciaApi.get("/muestras-analista-quimico");
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
        const response = await instanciaApi.get("/muestras-analista-quimico/observacionesMuestra/" + RUM);
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

 const obtenerDetallesMuestra = async (RUM) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/muestras-analista-quimico/detallesMuestra/" + RUM);
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
 const completarAnalisis = async (RUM) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/muestras-analista-quimico/completarAnalisis/" + RUM);
         console.log(response);
         if(response.status == 200){
             return response;
         } else {
             return response;
         }
         
     } catch (error) {
         console.log(error);
         return error;
     }
 };
 

 const crearObservacionMuestra = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-analista-quimico/crearObservacionMuestra",data);
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
    obtenerMuestras,
    obtenerObservaciones,
    obtenerDetallesMuestra,
    crearObservacionMuestra,
    completarAnalisis
};