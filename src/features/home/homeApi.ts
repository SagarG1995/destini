import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"
import { store } from "../../redux/store"
import { setAllProfessions } from "../profile/profileSlice"


export const getHomePlans = async (search = '', profession = '', page = 1) => {

    const { coords } = store.getState()?.location

    let url = endpoints.homeapi + 'radiusKm=200&limit=100'

    if (coords) {
        url += '&lat=' + coords?.latitude + '&lng=' + coords?.longitude
    }

    if (search) {
        url += '&search=' + search
    }
    if (profession) {
        url += '&professions=' + profession
    }

    url += '&page=' + page

    console.log(url);


    return await apiClient.get(url)
}

export const getProfessions = async (_param?: any) => {
    const res = await apiClient.get(endpoints.professions)
    if (res?.success) {
        const data = res?.data?.data ?? []
        store.dispatch(setAllProfessions(data))
    }

    return res
}
