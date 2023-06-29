import {
    crearApi
} from "../api-services/InstanciadorAxios";




const agregarMetodología = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/metodologias/agregarMetodologia", data,);
       
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const agregarParametro = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/parametros/agregarParametro", data,);
       
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const obtenerMetodologias= async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/metodologias");
           
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


 const agregarMatriz = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/matrices/agregarMatriz", data,);
      
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const agregarNorma = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/normas/agregarNorma", data,);
        
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
 const obtenerParametros= async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/parametros");
             
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

 const obtenerMatriz= async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/matrices");
            
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
 const obtenerMatrizParametro= async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/matrices-parametros");
             
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
 const obtenerNormas= async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/normas");
            
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

 const obtenerRelacion = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/visualizarDatos");
           
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



 const obtenerDetallesNorma = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/normas/detallesNorma/" + data.id_norma);
        
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
 const obtenerDetallesMetodologia = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/metodologias/" + data.id_metodologia);
         
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

 const obtenerDetallesParametro = async (data) => {
    try {
          const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/parametros/" + data.id_parametro);
         
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
          const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/matrices/detallesMatriz/" + data.id_matriz);
       
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

 const obtenerDetallesElementos = async (data) => {
    try {
          const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/visualizarDatos/detalles/" + data.id_matriz);
         
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
 
 const obtenerNormasMatriz = async (data) => {
    console.log("elemtntos tres",data)
    try {
         const response = await axios.get(apiUrl + "/normas-matrices/" + data);
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

 const obtenerTablasNorma = async (data) => {
    console.log("idnorma",data)
    try {
         const response = await axios.get(apiUrl + "/normas/detallesNorma/" + data);
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
 
 const actualizarNorma = async (data) => {
    try {
         const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/normas/actualizarNorma/",data);
        
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
         const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/parametros/actualizarParametro/",data);
        
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

 const actualizarMetodologia = async (data) => {
    try {
        
         const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/metodologias/actualizarMetodologia/",data);
        
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
        
         const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/matrices/actualizarMatriz/",data);
        
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
         const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/metodologias/"+ nombre_metodologia + "/eliminarEmpleados" , data.nombre_metodologia,);
       
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

const eliminar_Empleados_Asociados = async (nombre_metodologia, data) => {
    try {  
         const instanciaApi = await crearApi();
        const response = await instanciaApi.delete("/metodologias/" + nombre_metodologia + "/eliminarEmpleados", {data: data}
            );
      
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};


export default {
    obtenerMatrizParametro,
    agregarNorma,
    actualizarNorma,
    obtenerDetallesNorma,
    obtenerNormas,
    agregarMetodología,
    obtenerMetodologias,
    actualizarMetodologia,
    agregar_Empleados_Asociados,
    eliminar_Empleados_Asociados,
    obtenerDetallesMetodologia,
    agregarParametro,
    obtenerParametros,
    agregarMatriz,
    obtenerMatriz,
    obtenerDetallesParametro,
    obtenerDetallesMatriz,
    actualizarParametro,
    obtenerRelacion,
    obtenerDetallesElementos,
    actualizarMatriz,
    obtenerNormasMatriz,
    obtenerTablasNorma

}