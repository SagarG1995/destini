import { View, Text, StyleSheet, Image } from 'react-native'
import React, { memo, useMemo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'

const ActivityCard = () => {

    const status: string = 'rejected'
    const chatButtonEnabled: boolean = status === 'approved' ? true : status === 'pending' && false

    const statusBgColor = useMemo(() => {
        if (status === 'approved') {
            return { backgroundColor: colors.yellow1 }
        }
        if (status === 'pending') {
            return { backgroundColor: colors.green1 }
        }
        if (status === 'rejected') {
            return { backgroundColor: colors.red1 }
        }
    }, [status])

    return (
        <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.6, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={[styles.row, styles.flex1]}>
                    <Image source={icons.profilecirclecolor} style={styles.profile} resizeMode='contain' />
                    <Text style={styles.tripName} numberOfLines={2} allowFontScaling={false} >Someone from Rajori Garden is headed to Bistro Cafe!! </Text>
                </View>
                <View style={[styles.statusContainer, statusBgColor]}>
                    <Text style={styles.status}>{status}</Text>
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
                        <Image source={icons.calendarcolor} style={styles.icon} resizeMode='contain' />
                        <Text style={styles.text}>July 30,2025</Text>
                    </View>
                </View>
                {
                    status !== 'rejected' &&
                    <CustomButton
                        label='CHAT'
                        containerStyle={chatButtonEnabled ? styles.enableButton : styles.disableButton}
                        labelStyle={styles.buttonLabel}
                        enabled={chatButtonEnabled}
                    />
                }
            </View>
        </LinearGradient>
    )
}

export default memo(ActivityCard)

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        minHeight: 160,
        justifyContent: 'space-between',
        borderColor: colors.blue1,
        borderWidth: 1,
        overflow: 'hidden'
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
    mt_30: {
        marginTop: 30
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
        backgroundColor: 'red',
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
    enableButton: {
        borderRadius: 100,
        backgroundColor: colors.black,
        height: 30,
        width: '20%'
    },
    disableButton: {
        borderRadius: 100,
        backgroundColor: colors.grey3,
        height: 30,
        width: '20%'
    },
    buttonLabel: {
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.white,
        lineHeight: 20,
        includeFontPadding: false,
    }
})