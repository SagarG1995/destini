import { formatError } from './formatError';
import { formatSuccess } from './formatSuccess';
import api from './index';

const get = async <T>(url: string, config = {}) => {
    return await api.get<T>(url, config).then((res: any) => {
        return formatSuccess(res)
    }).catch((err: any) => {
        return formatError(err)
    })

};

const post = async <T>(url: string, data = {}, config = {}) => {
    return await api.post<T>(url, data, config).then((res: any) => {
        return formatSuccess(res)
    }).catch((err: any) => {
        return formatError(err)
    })
};

const patch = async <T>(url: string, data = {}, config = {}) => {
    return await api.patch<T>(url, data, config).then((res: any) => {
        return formatSuccess(res)
    }).catch((err: any) => {
        return formatError(err)
    })
};

const apiClient = {
    get,
    post,
    patch
};

export default apiClient;