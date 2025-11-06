import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"
import { store } from "../../redux/store"
import { setUserData } from "./profileSlice"


export const getMe = async () => {
    const res = await apiClient.get(endpoints.getme)
    if (res?.success) {
        store.dispatch(setUserData(res?.data?.user))
    }
    return res
}

export const updateMe = async (param: {} | undefined) => {
    return await apiClient.patch(endpoints.updateme, param)
}
