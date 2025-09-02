import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'

const Plans = () => {


    const renderItem = useCallback(() => {
        return (
            <>
            </>
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
                    leftIcon={<Image source={icons.plans} style={styles.calenderIcon} resizeMode='contain' />}
                />
                <CustomButton
                    label='My plans'
                    badgeCount={10}
                    containerStyle={styles.button}
                    leftIcon={<Image source={icons.calendarheart} style={styles.calenderIcon} resizeMode='contain' />}
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
    },
    separator: {
        marginTop: 15
    }
})