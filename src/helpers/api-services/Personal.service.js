import axios from "axios";
import config from '@/../public/config.json'

const controller = config.BASE_URL_SIS_API;

const ingresarPersonal = (data) => {
    return axios.post(controller +"/empleados",data,
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            }
        }).then((response) => {
            console.log(response)
            return response;
        }).catch(function (error) {
            console.log(error);
            return;
        });
};

export default {
    ingresarPersonal,

};