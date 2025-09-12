import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import ChatHeader from '../component/ChatHeader'
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const GroupChat = () => {

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer 👋",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);

    return (
        <View style={styles.container}>
            <ChatHeader />
            <GiftedChat
                messages={messages}
                onSend={(msg) => onSend(msg)}
                user={{
                    _id: 1, // your user id
                }}
            />
        </View>
    )
}

export default GroupChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})