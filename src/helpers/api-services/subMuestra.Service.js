import axios from "axios";
import config from '@/../public/config.json'

const apiUrl = config.BASE_URL_SIS_API;

const ingresarSubMuestra = async (submuestraData) => {
    try {  
        const response = await axios.post(apiUrl + "/muestras/{RUM}/submuestras", submuestraData,
            );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};

export default {
    ingresarSubMuestra,
   

};