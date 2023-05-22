import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const editarFechas = async (data) => {
    try {  
        const response = await axios.put(apiUrl + "/personal/modificarFechasVacaciones/"+data.rut_empleado, data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
const editarDiasDisponibles = async (data) => {
    try {  
        const response = await axios.put(apiUrl + "/personal/modificarDiasDisponibles/"+data.rut_empleado, data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

export default {
    editarFechas,
    editarDiasDisponibles

};