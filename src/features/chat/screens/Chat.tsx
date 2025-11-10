import { View, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import ChatCard from '../component/ChatCard'
import { getAllChats } from '../chatApi'

const Chat = () => {

    const [chats, setChats] = useState<Array<any>>([])

    useEffect(() => {
        getAllChats().then(res => {
            console.log(res);
            if (res?.success) {
                setChats(res?.data?.groups ?? [])
            }
        })
    }, [])



    const renderItem = ({ item }: any) => {
        return <ChatCard data={item} />
    }

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={chats}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                ItemSeparatorComponent={separator}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    separator: {
        marginTop: 10
    },
    listStyle: {
        // backgroundColor: 'red'
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
    }
})