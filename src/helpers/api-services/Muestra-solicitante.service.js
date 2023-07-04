import {
    crearApi
} from "../api-services/InstanciadorAxios";




 const obtenerMuestras = async () => {
   try {
    const instanciaApi = await crearApi();
    const response = await instanciaApi.get("/muestras-solicitante");
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

const responderEncuesta = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-solicitante/responderEncuesta/",data);
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
}

 const obtenerDetallesMuestra = async (RUM) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/muestras-solicitante/detallesMuestra/" + RUM);
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
    obtenerDetallesMuestra,
    responderEncuesta
};