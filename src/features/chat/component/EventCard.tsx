import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { icons } from '../../../shared/constants/icons'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { images } from '../../../shared/constants/images'
import CustomButton from '../../../shared/component/CustomButton'
import { useNavigation } from '@react-navigation/native'

const EventCard = () => {

    const navigation = useNavigation<any>()


    return (
        <View style={styles.container}>
            <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.3, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.gradient1}>
                <View style={styles.header}>
                    <Image source={images.logo} style={styles.logo} tintColor={colors.blue1} resizeMode='cover' />
                    <TouchableOpacity style={styles.descContainer}>
                        <View style={[styles.row, styles.justifyBtw]}>
                            <Text style={styles.heading} numberOfLines={1}>Headed to Bistro Cafe!!</Text>
                            <View style={styles.userCounter}>
                                <Image source={icons.user} style={styles.userIcon} resizeMode='contain' tintColor={colors.white} />
                                <Text style={styles.userCount}>4</Text>
                            </View>
                        </View>
                        <Text style={styles.desc} numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.flex1}>
                        <View style={styles.row}>
                            <Image source={icons.locationblue} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>Sunrise Park, Noida</Text>
                        </View>

                        <View style={[styles.row, styles.mt_5]}>
                            <Image source={icons.calendarblue} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>October 1,2025</Text>
                        </View>
                    </View>
                    <CustomButton
                        label='CHAT'
                        containerStyle={styles.button}
                        labelStyle={styles.buttonLabel}
                        onPress={() => navigation.navigate('groupchat')}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}

export default memo(EventCard)

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        minHeight: 130,
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
    gradient1: {
        flex: 1,
        padding: 10,
    },
    justifyBtw: {
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
    },
    logo: {
        width: 35,
        height: 50,
    },
    descContainer: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'space-between',
        paddingVertical: 2,
        // backgroundColor: 'pink'
    },
    downIcon: {
        width: 20,
        height: 20,
    },
    heading: {
        flexShrink: 1,
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        includeFontPadding: false
    },
    desc: {
        fontFamily: fonts.regular,
        fontSize: 8,
        color: colors.black,
        width: '90%',
        includeFontPadding: false
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto'
    },
    icon: {
        width: 18,
        height: 18
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
        height: 30,
        width: '20%'
    },
    buttonLabel: {
        fontSize: 10
    },
    userCounter: {
        backgroundColor: colors.blue1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8
    },
    userIcon: {
        width: 15,
        height: 15
    },
    userCount: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white,
        includeFontPadding: false,
        marginLeft: 5
    }
})