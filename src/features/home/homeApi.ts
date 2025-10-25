import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"
import { store } from "../../redux/store"


export const getHomePlans = async (search = '', profession = '', page = 1) => {

    const { coords } = store.getState()?.location

    let url = endpoints.homeapi + 'radiusKm=15&limit=100'

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