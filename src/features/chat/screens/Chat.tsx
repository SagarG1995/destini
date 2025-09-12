import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import EventCard from '../component/EventCard'

const Chat = () => {

    const renderItem = ({ }) => {
        return <EventCard />
    }

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={[{}, {}, {}]}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                ItemSeparatorComponent={separator}
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
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 20
    }
})