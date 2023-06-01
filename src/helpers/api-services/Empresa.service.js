import {
    crearApi
} from "../api-services/InstanciadorAxios";

const ingresarEmpresa = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.post("/empresas/agregarEmpresa", data,
            );
        console.log(response);
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
        console.log(response);
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
        console.log(response);
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

const obtenerTodasCiudad = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/ciudades");
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
    ingresarEmpresa,
    obtenerTodasEmpresa,
    obtenerDetallesEmpresa,
    actualizarEmpresa,
    obtenerTodasCiudad

};