import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import ChatCard from '../component/ChatCard'
import { getAllChats } from '../chatApi'
import { fonts } from '../../../shared/constants/fonts'

const Chat = () => {

    const [chats, setChats] = useState<Array<any>>([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getChats()
    }, [])

    const getChats = () => {
        setLoader(true)
        getAllChats().then(res => {
            if (res?.success) {
                setChats(res?.data?.groups ?? [])
            }
        }).finally(() => setLoader(false))
    }


    const renderItem = useCallback(({ item }: any) => {
        return <ChatCard data={item} />
    }, [])

    const listEmptyComponent = useCallback(() => {
        if (loader) return null
        return <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Active chats...</Text>
        </View>
    }, [loader])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header isRefreshing={loader} />
            <FlatList
                data={chats}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                ItemSeparatorComponent={separator}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={listEmptyComponent}
                refreshControl={<RefreshControl onRefresh={getChats} refreshing={loader} />}
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
        paddingBottom: 80
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        textAlign: 'center',
        includeFontPadding: false
    }
})