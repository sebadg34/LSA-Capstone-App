import {
    crearApi
} from "../api-services/InstanciadorAxios";


const editarFechas = async (data) => {
    try { 
        const instanciaApi = await crearApi(); 
        const response = await instanciaApi.put("/personal/modificarFechasVacaciones/"+data.rut_empleado, data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
const editarDiasDisponibles = async (data) => {
    try {  
        const instanciaApi = await crearApi();
        const response = await instanciaApi.put("/personal/modificarDiasDisponibles/"+data.rut_empleado, data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default {
    editarFechas,
    editarDiasDisponibles

};