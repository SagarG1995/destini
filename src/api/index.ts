import axios from 'axios';
import env from './env';
import { store } from '../redux/store';

const api = axios.create({
    baseURL: env.baseUrl,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = store.getState()?.auth?.authdata?.access_token
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
