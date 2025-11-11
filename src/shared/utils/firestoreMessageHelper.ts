
import { addDoc, collection, getFirestore, serverTimestamp } from "@react-native-firebase/firestore";
import { store } from "../../redux/store";
import { showToast } from "./toast";


export const sendMessage = async (firebaseGroupId: string, message: string) => {

    const db = getFirestore();
    const { userdata } = store.getState()?.profile

    try {
        return await addDoc(
            collection(db, 'groups', firebaseGroupId, 'messages'),
            {
                senderId: userdata.userId,
                senderName: userdata?.full_name,
                message,
                gender: userdata?.gender,
                timestamp: Date.now(),    // Firestore server timestamp,
                readabletimestamp: serverTimestamp(),
                leftGroup: false
            }
        ).then(res => {
            console.log("send msg ==> ", res);
            if (res) {
                return true
            }
        }).catch((err) => {
            showToast(err)
            return false
        })
    } catch (error: any) {
        console.log(error);
        showToast(error)
        return false
    }

}