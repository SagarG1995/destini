import { ToastAndroid } from "react-native"
import { isIOS } from "../constants/dimensions"


export const showToast = (message: string | null) => {
    if (!message) return
    if (isIOS) {

    } else {
        ToastAndroid.show(message, 1000)
    }
}