import axios from 'axios';
<<<<<<< HEAD
const apiURL = "https://ndschatserver.herokuapp.com";
// const apiURL = "http://localhost:8080"
=======
const apiURL = "http://localhost:8080";
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
export default class Service{
    get(endpoint, options = null){
        const url = `${apiURL}/${endpoint}`;
        return axios.get(url, options);

    }
    post(endpoint = "", data = {}, options = {headers: {
        'Content-Type': 'application/json',
        'enctype': "multipart/form-data",
}}){
        const url = `${apiURL}/${endpoint}`;
        return axios.post(url, data, options);
    }
}