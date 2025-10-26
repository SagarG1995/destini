import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"


export const getPlaceSuggestion = async (query: string) => {
    return await apiClient.get(endpoints.getplacesuggestion + '?q=' + query)
}

export const createPlan = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.createplan, param)
}

export const getMyPlans = async () => {
    return await apiClient.get(endpoints.myplans)
}