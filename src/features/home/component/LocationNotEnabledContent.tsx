import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { openSettings } from 'react-native-permissions'

const LocationNotEnabledContent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label1}>Location not enabled</Text>
            <CustomButton
                label='Turn On'
                onPress={() => openSettings()}
                containerStyle={styles.mt_15}
            />
        </View>
    )
}

export default LocationNotEnabledContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label1: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black
    },
    mt_15: {
        marginTop: 15
    }
})