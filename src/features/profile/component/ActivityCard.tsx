import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import moment from 'moment'
import { ACCEPTED, DECLINED, PENDING } from '../../../shared/constants/planStatus'

interface ActivityCardInterface {
    data?: any
}

const ActivityCard: FC<ActivityCardInterface> = ({
    data = null
}) => {

    // console.log(data);

    const chatButtonEnabled: boolean = data?.status === ACCEPTED ? true : false

    const statusBgColor = useMemo(() => {
        if (data?.status === ACCEPTED) {
            return { backgroundColor: colors.yellow1 }
        }
        if (data?.status === PENDING) {
            return { backgroundColor: colors.green1 }
        }
        if (data?.status === DECLINED) {
            return { backgroundColor: colors.red1 }
        }
    }, [data?.status])


    if (!data) return null
    return (
        <View style={styles.container}>
            <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.3, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.gradient1}>
                <View style={styles.cardHeader}>
                    <View style={[styles.row, styles.flex1]}>
                        <Image source={icons.profilecirclecolor} style={styles.profile} resizeMode='contain' />
                        <Text style={styles.tripName} numberOfLines={2} allowFontScaling={false} >
                            {data?.planTitle}
                        </Text>
                    </View>
                    <View style={[styles.statusContainer, statusBgColor]}>
                        <Text style={styles.status}>{data?.status}</Text>
                    </View>
                </View>
                <Text style={[styles.description]} numberOfLines={2} allowFontScaling={false}>
                    {data?.planDescription}
                </Text>

                <View style={[styles.row, styles.mt_15]}>
                    <View style={styles.flex1}>
                        <View style={styles.row}>
                            <Image source={icons.locationcolor} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>3 KM away from you</Text>
                        </View>
                        <View style={[styles.row, styles.mt_5]}>
                            <Image source={icons.calendercolor} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>
                                {
                                    moment(data?.planAt).format("MMM, DD YYYY")
                                }
                            </Text>
                        </View>
                    </View>
                    {
                        data?.status !== DECLINED &&
                        <CustomButton
                            label='CHAT'
                            containerStyle={[styles.enableButton, !chatButtonEnabled && styles.disableButton]}
                            labelStyle={styles.buttonLabel}
                            enabled={chatButtonEnabled}
                        />
                    }
                </View>
            </LinearGradient>
        </View>
    )
}

export default memo(ActivityCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
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
        backgroundColor: colors.red1,
        height: 16,
        paddingHorizontal: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        fontSize: 10,
        fontFamily: fonts.semibold,
        color: colors.white,
        lineHeight: 10,
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
        backgroundColor: colors.grey3,
    },
    buttonLabel: {
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.white,
        lineHeight: 20,
        includeFontPadding: false,
    }
})