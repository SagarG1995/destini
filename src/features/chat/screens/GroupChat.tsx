/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import ChatHeader from '../component/ChatHeader'
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useRoute } from '@react-navigation/native';
import MessageBubble from '../component/MessageBubble';
import { fonts } from '../../../shared/constants/fonts';
import MessageInputBar from '../component/MessageInputBar';
import { collection, doc, getDocs, getFirestore, orderBy, query } from '@react-native-firebase/firestore';
import { parseFirestoreTimestamp } from '../../../shared/utils/firebaseTimeParser';
import { images } from '../../../shared/constants/images';
import { useAppSelector } from '../../../redux/store';

const GroupChat = () => {

    const { tripDetails } = useRoute<any>()?.params
    const db = getFirestore();
    const { userdata } = useAppSelector(state => state.profile)

    const [messages, setMessages] = useState<IMessage[]>([]);

    const getMesssages = async () => {

        const q = query(collection(db, 'groups', tripDetails?.groupId, 'messages'), orderBy('timestamp', 'desc'));

        const querySnapshot = await getDocs(q);
        const groupMessages = querySnapshot.docs.map((docSnap: any) => {
            const data = docSnap.data() || {};
            const docid = docSnap.id
            const createdAt = parseFirestoreTimestamp(data.timestamp);

            return {
                _id: docid,
                text: data?.message,
                createdAt,
                user: {
                    _id: data?.senderId,
                    name: data?.senderName,
                    avatar: data?.gender === 'male' ? images.boy : images.girl,
                },
                groupId: tripDetails?.groupId,
                unixtimestamp: data?.unixtimestamp
            };
        });
        setMessages(groupMessages);
    }

    useEffect(() => {
        getMesssages()
    }, []);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);

    const renderBubble = useCallback((props: any) => {
        return <MessageBubble {...props} />
    }, [])

    const messageInputBar = useCallback(() => {
        return <MessageInputBar groupId={tripDetails?.groupId} />
    }, [tripDetails])

    return (
        <View style={styles.container}>
            <ChatHeader data={tripDetails} />
            <GiftedChat
                messages={messages}
                onSend={(msg) => onSend(msg)}
                user={{
                    _id: userdata?.userId, // your user id
                }}
                renderBubble={renderBubble}
                renderAvatar={() => null}
                renderInputToolbar={messageInputBar}
                keyboardShouldPersistTaps='handled'
                messagesContainerStyle={styles.messagesContainerStyle}
            />
        </View>
    )
}

export default GroupChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    inputToolbar: {
        borderTopWidth: 0,
        marginHorizontal: 8,
        marginVertical: 6,
        borderRadius: 24,
        backgroundColor: '#111',
        paddingVertical: 4,
        fontFamily: fonts.regular
    },
    messagesContainerStyle: {
        marginBottom: 20
    }
})