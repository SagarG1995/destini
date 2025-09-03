import { View, StyleSheet, Image, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'
import PlanCard from '../component/PlanCard'
import { useNavigation } from '@react-navigation/native'
import TopTripCard from '../component/TopTripCard'

const Plans = () => {

    const navigation = useNavigation<any>()


    const renderItem = useCallback(() => {
        return (
            <TopTripCard />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.buttonContainer}>
                <CustomButton
                    label='Create a plan'
                    containerStyle={styles.button}
                    // onPress={() => navigation.navigate('myplans')}
                    leftIcon={<Image source={icons.plans} style={styles.calenderIcon} resizeMode='contain' />}
                />
                <CustomButton
                    label='My plans'
                    badgeCount={10}
                    containerStyle={styles.button}
                    onPress={() => navigation.navigate('myplans')}
                    leftIcon={<Image source={icons.calenderheart} style={styles.calenderIcon} resizeMode='contain' />}
                />
            </View>

            <FlatList
                data={[{}, {}, {}, {}]}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
            />

        </View>
    )
}

export default Plans

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 20
    },
    button: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calenderIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 100,
        paddingHorizontal: 20
    },
    separator: {
        marginTop: 15
    }
})