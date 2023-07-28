import {
    crearApi
} from "./InstanciadorAxios";


const agregarOrdenCompra = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-administrador-finanzas/agregarOrdenCompra/",data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        }
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const descargarOrdenCompra = async (data) => {
    try { 
        const instanciaApi = await crearApi(); 
        
        const response = await instanciaApi.post("/muestras-administrador-finanzas/descargarOrdenCompra",data,{
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
const eliminarOrdenCompra = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-administrador-finanzas/eliminarOrdenCompra",data);
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
    const response = await instanciaApi.get("/muestras-administrador-finanzas");
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
        const response = await instanciaApi.get("/muestras-administrador-finanzas/observacionesMuestra/" + RUM);
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
        const response = await instanciaApi.get("/muestras-administrador-finanzas/detallesMuestra/" + RUM);
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


 const crearObservacionMuestra = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/muestras-administrador-finanzas/crearObservacionMuestra",data);
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
    agregarOrdenCompra,
    descargarOrdenCompra,
    eliminarOrdenCompra
};