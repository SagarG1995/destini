import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import TripCard from '../component/TripCard'
import { ImageBackground } from 'react-native/types_generated/index'
import { fonts } from '../../../shared/constants/fonts'
import FooterTabMenu from '../../../app/navigation/component/FooterTabMenu'

const Home = () => {


    const renderItem = useCallback(() => {
        return (
            <TripCard

            />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.heading}>Plans you might like!</Text>
            <FlatList
                data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                renderItem={renderItem}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
            />
            {/* <FooterTabMenu /> */}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.black,
        marginTop: 20,
        marginLeft: 20
    },
    listStyle: {
        marginTop: 10
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    separator: {
        marginTop: 15
    }
})