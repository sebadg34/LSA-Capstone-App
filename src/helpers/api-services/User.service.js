import axios from "axios";
//import config from '@/../public/config.json'

//const apiUrl = config.BASE_URL_SIS_API;
//const baseUrl = config.BSE_URL;

const login = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
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
}
export default {
    login,

};