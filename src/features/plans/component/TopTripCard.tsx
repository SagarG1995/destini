import { View, Text, StyleSheet, Image } from 'react-native'
import React, { memo } from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import CustomButton from '../../../shared/component/CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import { icons } from '../../../shared/constants/icons'

const TopTripCard = () => {
    return (
        <View style={styles.container}>
            <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.3, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.gradient1}>
                <View style={styles.cardHeader}>
                    <View style={[styles.row, styles.flex1]}>
                        <Image source={icons.profilecirclecolor} style={styles.profile} resizeMode='contain' />
                        <Text style={styles.tripName} numberOfLines={2} allowFontScaling={false} >Someone from Rajori Garden is headed to Bistro Cafe!! </Text>
                    </View>
                    <View style={[styles.statusContainer]}>
                        <Text style={styles.status}>Top Pick</Text>
                    </View>
                </View>
                <Text style={[styles.description]} numberOfLines={2} allowFontScaling={false}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .
                </Text>

                <View style={[styles.row, styles.mt_15]}>
                    <View style={styles.flex1}>
                        <View style={styles.row}>
                            <Image source={icons.locationcolor} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>3 KM away from you</Text>
                        </View>
                        <View style={[styles.row, styles.mt_5]}>
                            <Image source={icons.calendercolor} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>July 30,2025</Text>
                        </View>
                    </View>
                    {

                        <CustomButton
                            label='Request to Join'
                            containerStyle={styles.button}
                            labelStyle={styles.buttonLabel}
                        />
                    }
                </View>
            </LinearGradient>
        </View>
    )
}

export default memo(TopTripCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        minHeight: 160,
        borderColor: colors.blue1,
        borderWidth: 1,
        overflow: 'hidden'
    },
    gradient1: {
        flex: 1,
        padding: 10,
    },
    flex1: {
        flex: 1
    },
    mt_5: {
        marginTop: 5
    },
    mt_15: {
        marginTop: 15
    },
    cardHeader: {
        flexDirection: 'row',
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
        fontSize: 14,
        color: colors.black,
        marginHorizontal: 10,
        includeFontPadding: false,
    },
    statusContainer: {
        backgroundColor: colors.black,
        height: 16,
        paddingHorizontal: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        fontSize: 8,
        fontFamily: fonts.semibold,
        color: colors.white,
        // lineHeight: 10,
        textTransform: 'uppercase',
        includeFontPadding: false,
    },
    description: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.black,
        marginTop: 10,
        includeFontPadding: false,
    },
    icon: {
        width: 20,
        height: 20
    },
    text: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.black,
        marginLeft: 5,
        includeFontPadding: false,
    },
    button: {
        borderRadius: 100,
        backgroundColor: colors.black,
        height: 30,
    },
    buttonLabel: {
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.white,
        lineHeight: 20,
        includeFontPadding: false,
    }
})