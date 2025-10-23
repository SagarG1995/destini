import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"


export const getMe = async () => {
    return await apiClient.get(endpoints.getme)
}

export const updateMe = async (param: {} | undefined) => {
    // console.log(param);

    return await apiClient.get(endpoints.updateme, param)
}