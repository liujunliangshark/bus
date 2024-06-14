import axios from 'axios';
const baseURL = '/api';
const instance = axios.create({
    baseURL,
    timeout: 5000
});
export default instance;