import axios from 'axios';

export default axios.create({
   baseURL: 'https://ndsbirthdayserver.herokuapp.com',
  // baseURL: 'https://server.ylight.xyz',
});
