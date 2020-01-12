import axios from 'axios';

export const ax = axios.create({
    baseURL: 'http://localhost/v1/api',
    timeout: 2000
}); 