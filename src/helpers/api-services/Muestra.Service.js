import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const ingresarMuestra = async (data) => {
    try {  
        const response = await axios.post(apiUrl + "/muestras", data,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};
/* const obtenerTodosPersonal = async () => {
   try {
        const response = await axios.get(apiUrl + "/empleados");
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
}; */

export default {
    ingresarMuestra,
   // obtenerTodosPersonal,

};