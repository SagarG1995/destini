import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'

const NoTripComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>There is no trip around you.</Text>
        </View>
    )
}

export default NoTripComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 15,
        color: colors.black,
        includeFontPadding: false
    }
})