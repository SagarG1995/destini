import axios from 'axios';
import env from './env';
import { store } from '../redux/store';

const api = axios.create({
    baseURL: env.baseUrl,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = store.getState()?.auth?.authdata?.access_token
    const reset_token = store.getState()?.auth?.resetToken
    if (token || reset_token) config.headers.Authorization = `Bearer ${token || reset_token}`;

    // console.log(config);


    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

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
