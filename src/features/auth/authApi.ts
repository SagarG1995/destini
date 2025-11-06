import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"

export const login = async (param: any) => {
    return await apiClient.post(endpoints.login, param)
}

export const register = async (param: any) => {
    return await apiClient.post(endpoints.register, param)
}

export const verifyRegisterOtp = async (param: any) => {
    return await apiClient.post(endpoints.verifyregisterotp, param)
}

export const getProfessions = async (_param?: any) => {
    return await apiClient.get(endpoints.professions)
}

export const sendForgotPasswordOtp = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.sendfogotpasswordotp, param)
}

export const verifyForgotPasswordOtp = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.verifyforgotpasswordotp, param)
}

export const changePassword = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.changepassword, param)
}

export const completeProfile = async (param: {} | undefined) => {
    return await apiClient.patch(endpoints.completeprofile, param)
}

export const googleLogin = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.googlelogin, param);
}