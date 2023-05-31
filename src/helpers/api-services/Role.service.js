//import config from '@/../public/config.json'
import {
    crearApi
} from "../api-services/InstanciadorAxios";



const obtenerRoles = async () => {
    try {
        const instanciaApi = await crearApi();
        const response = await instanciaApi.get("/roles",);
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
    obtenerRoles

};