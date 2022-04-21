import axios from 'axios';

<<<<<<< HEAD
export default axios.create({
    baseURL: "https://ndsbirthdayserver.herokuapp.com",
});
=======
const instance = axios.create({
    baseURL: "http://localhost:9150",
});
export default instance
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
