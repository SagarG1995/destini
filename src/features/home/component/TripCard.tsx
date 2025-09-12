import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../shared/constants/colors'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import CustomButton from '../../../shared/component/CustomButton'

interface TripCardInterface {

}

const TripCard: FC<TripCardInterface> = ({

}) => {


    return (
        <LinearGradient useAngle={true} angle={160} angleCenter={{ x: 1, y: 0.5 }} colors={[colors.black, colors.blue1]} style={styles.container}>
            <View style={styles.row}>
                <Image source={icons.profilecircle} style={styles.profile} resizeMode='contain' />
                <Text style={styles.tripName} numberOfLines={2} allowFontScaling={false} >Someone from Rajori Garden is headed to Bistro Cafe!!</Text>
            </View>

            <View style={[styles.row, styles.mt_30]}>
                <View style={styles.flex1}>
                    <View style={styles.row}>
                        <Image source={icons.location} style={styles.icon} resizeMode='contain' />
                        <Text style={styles.distance} numberOfLines={1}>3 KM away from you</Text>
                    </View>
                    <View style={[styles.row, styles.mt_5]}>
                        <Image source={icons.calendar} style={styles.icon} resizeMode='contain' />
                        <Text style={styles.distance} numberOfLines={1}>July 30,2025</Text>
                    </View>
                </View>
                <CustomButton
                    label='Request to Join'
                    containerStyle={styles.reqButton}
                    labelStyle={styles.reqButtonLabel}
                />
            </View>
        </LinearGradient>
    )
}

export default memo(TripCard)

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        minHeight: 155,
        justifyContent: 'space-between'
    },
    flex1: {
        flex: 1
    },
    mt_5: {
        marginTop: 5
    },
    mt_30: {
        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile: {
        width: 35,
        height: 35
    },
    tripName: {
        flex: 1,
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.white,
        marginLeft: 10,
        includeFontPadding: false,
    },
    icon: {
        width: 20,
        height: 20
    },
    distance: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.white,
        marginLeft: 5,
        includeFontPadding: false,
    },
    reqButton: {
        borderRadius: 100,
        backgroundColor: colors.white,
        height: 30
    },
    reqButtonLabel: {
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.black,
        includeFontPadding: false,
    }
})