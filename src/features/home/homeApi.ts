import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"


export const getHomePlans = async (location: any = {}, search = '', profession = '', page = 1) => {

    let url = endpoints.homeapi + 'radiusKm=15&limit=100'

    if (location) {
        url += '&lat=' + location?.latitude + '&lng=' + location?.longitude
    }

    if (search) {
        url += '&search=' + search
    }
    if (profession) {
        url += '&professions=' + profession
    }

    return await apiClient.get(url)
}