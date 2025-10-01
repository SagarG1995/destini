import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import TripCard from '../component/TripCard'
import { ImageBackground } from 'react-native/types_generated/index'
import { fonts } from '../../../shared/constants/fonts'
import FooterTabMenu from '../../../app/navigation/component/FooterTabMenu'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import { getMe } from '../../profile/profileApi'
import { useAppDispatch } from '../../../redux/store'
import { setUserData } from '../../profile/profileSlice'

const Home = () => {

    const dispatch = useAppDispatch()
    const [isOpen, setIsopen] = useState(false)

    useEffect(() => {
        getProfile()

    }, [])

    const getProfile = () => {
        getMe().then(res => {
            console.log(res);

            if (res?.success) {
                dispatch(setUserData(res?.data?.user))
            }
        })
    }

    const toogleModal = useCallback(() => {
        setIsopen(!isOpen)
    }, [isOpen])

    const renderItem = useCallback(() => {
        return (
            <TripCard

            />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header toogleModal={toogleModal} />
            <Text style={styles.heading}>Plans you might like!</Text>
            <FlatList
                data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                renderItem={renderItem}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
            />
            <ProfessionModal
                // addMarginBottom
                isOpen={isOpen}
                toggleModal={toogleModal}
            />
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
        paddingBottom: 30
    },
    separator: {
        marginTop: 15
    }
})