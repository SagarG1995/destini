import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../shared/component/CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../shared/constants/colors'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import { images } from '../../../shared/constants/images'
import AvatarGroup from './AvatarGroup'
import ExpandedRequest from './ExpandedRequest'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const PlanCard = () => {

    const height = useSharedValue(0)
    const [expandList, setExpandList] = useState(false)


    const toggleExpandList = () => {
        setExpandList(!expandList)
        if (expandList) {
            height.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.ease),
            })
        } else {
            height.value = withTiming(150, {
                duration: 300,
                easing: Easing.out(Easing.ease),
            })
        }
    }

    const animatedExpandedListStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            overflow: 'hidden'
        }
    })

    return (
        <View style={styles.container}>
            <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.3, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.gradient1}>
                <View style={styles.header}>
                    <Image source={images.logo} style={styles.logo} tintColor={colors.blue1} resizeMode='cover' />
                    <TouchableOpacity style={styles.descContainer} onPress={toggleExpandList}>
                        <View style={[styles.row, styles.justifyBtw]}>
                            <Text style={styles.heading} numberOfLines={1}>Headed to Bistro Cafe!!</Text>
                            <Image source={icons.arrowdown} style={styles.downIcon} tintColor={colors.black} resizeMode='contain' />
                        </View>
                        <Text style={styles.desc} numberOfLines={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et .</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.flex1}>
                        <View style={styles.row}>
                            <Image source={icons.locationblue} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>3 KM away from you</Text>
                        </View>

                        <View style={[styles.row, styles.mt_5]}>
                            <Image source={icons.calendarblue} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>August 15,2025</Text>
                        </View>

                    </View>
                    <AvatarGroup
                        avatars={[
                            'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                            'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                            'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                            'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                        ]}
                    />
                </View>

                {
                    // expandList &&
                    <Animated.View style={[animatedExpandedListStyle]} >
                        <ExpandedRequest
                            avatars={[
                                'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                                'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                                'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                                'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
                                'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
                                'https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                            ]}
                        />
                    </Animated.View>
                }
            </LinearGradient>
        </View>
    )
}

export default PlanCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        minHeight: 140,
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
        // backgroundColor: 'red'
    },
    descContainer: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'space-between'
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
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 'auto'
        marginTop: 20
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

})