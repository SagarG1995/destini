import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"


export const getAllChats = async () => {
    return await apiClient.get(endpoints.getchats)
}