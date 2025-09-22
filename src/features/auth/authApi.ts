import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"

export const login = async (param: any) => {
    return await apiClient.post(endpoints.login, param)
}

export const register = async (param: any) => {
    return await apiClient.post(endpoints.register, param)
}

export const verifyOtp = async (param: any) => {
    return await apiClient.post(endpoints.verifyotp, param)
}


export const getProfessions = async (_param?: any) => {
    return await apiClient.get(endpoints.professions)
}