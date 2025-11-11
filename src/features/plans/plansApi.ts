import apiClient from "../../api/client"
import { endpoints } from "../../api/endpoints"
import { store } from "../../redux/store"
import { showToast } from "../../shared/utils/toast"
import { setActivities, setMyPlans } from "./planSlice"


export const getPlaceSuggestion = async (query: string) => {
    return await apiClient.get(endpoints.getplacesuggestion + '?q=' + query)
}

export const createPlan = async (param: {} | undefined) => {
    return await apiClient.post(endpoints.plans, param)
}

export const deletePlan = async (plan_id: string) => {
    return await apiClient._delete(endpoints.plans + plan_id)
}

export const updatePlan = async (param: any, plan_id: string) => {
    return await apiClient.put(endpoints.plans + plan_id, param)
}

export const getMyPlans = async () => {
    const res = await apiClient.get(endpoints.myplans)
    if (res?.success) {
        store.dispatch(setMyPlans(res?.data?.data ?? []))
    } else {
        // showToast(res?.message)
    }

    return res
}

export const acceptDeclineRequest = async (req_id: string, req_type: string) => {
    return await apiClient.post(endpoints.acceptdeclinerequest + req_id + "/" + req_type)
}

export const getTopPicksPlans = async (search = '', profession = '', page = 1) => {

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

    url += '&page=' + page + "&topPick=true"

    console.log(url);

    return await apiClient.get(url)
}

export const requestPlan = async (plan_id: string) => {
    const { coords } = store.getState()?.location
    const param = {
        lat: coords?.latitude,
        lng: coords?.longitude
    }
    return await apiClient.post(endpoints.requestplan + plan_id, param)
}


export const getActivities = async () => {
    const res = await apiClient.get(endpoints.activities)
    // console.log(res);

    if (res?.success) {
        store.dispatch(setActivities(res?.data?.data ?? []))
    }
    return res
}

export const exitFromPlan = async (plan_id: string) => {
    return await apiClient._delete(endpoints.exitplan + plan_id + '/leave')
}