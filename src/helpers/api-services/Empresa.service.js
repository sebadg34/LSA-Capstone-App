import {
    crearApi
} from "../api-services/InstanciadorAxios";




const existeEmpresa = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empresas/existeEmpresa", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};
const existeCorreoEmpresa = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empresas/existeCorreo", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
};


const ingresarEmpresa = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empresas/agregarEmpresa", data,
            );
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const actualizarEmpresa = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/empresas/actualizarEmpresa/"+data.rut_empresa, data,
            );
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};



const obtenerDetallesEmpresa = async (data) => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/empresas/"+data);
    if(response.status == 200){
        return response;
    }else{
        return;
    }
    } catch (error){
        console.log(error);
        return;
    }
}
const obtenerTodasEmpresa = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/empresas");
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

const obtenerTodasCiudad = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/ciudades");
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
    existeCorreoEmpresa,
    ingresarEmpresa,
    obtenerTodasEmpresa,
    obtenerDetallesEmpresa,
    actualizarEmpresa,
    obtenerTodasCiudad,
    existeEmpresa

};