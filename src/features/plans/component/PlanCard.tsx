import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import CustomButton from '../../../shared/component/CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../shared/constants/colors'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import { images } from '../../../shared/constants/images'
import AvatarGroup from './AvatarGroup'
import ExpandedRequest from './ExpandedRequest'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { deletePlan, getMyPlans } from '../plansApi'
import { showToast } from '../../../shared/utils/toast'


interface PlanCardInterface {
    data?: any
}

const PlanCard: FC<PlanCardInterface> = ({
    data = null
}) => {

    const height = useSharedValue(0)
    const navigation = useNavigation<any>()
    const [expandList, setExpandList] = useState(false)
    const [loader, setLoader] = useState(false)


    const toggleExpandList = () => {

        const requestCount = data?.requests?.length || 0
        const targetHeight = Math.min(requestCount * 50, 150)

        setExpandList(!expandList)
        height.value = withTiming(expandList ? 0 : targetHeight, {
            duration: 300,
            easing: Easing.out(Easing.ease),
        })
    }

    const animatedExpandedListStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            overflow: 'hidden'
        }
    })

    const onDelete = () => {
        setLoader(true)
        deletePlan(data?._id).then(res => {
            if (res?.success) {
                showToast("Plan deleted!!!")
                getMyPlans()
            } else {
                showToast(res?.message)
            }
        }).finally(() => setLoader(false))
    }



    if (!data) return null
    return (
        <View style={styles.container}>
            <LinearGradient useAngle={true} angle={120} angleCenter={{ x: 0.3, y: 0.5 }} colors={[colors.blue2, colors.white]} style={styles.gradient1}>
                <View style={styles.header}>
                    <Image source={images.logo} style={styles.logo} tintColor={colors.blue1} resizeMode='cover' />
                    <TouchableOpacity style={styles.descContainer} onPress={toggleExpandList}>
                        <View style={[styles.row, styles.justifyBtw]}>
                            <Text style={styles.heading} numberOfLines={1}>{data?.title}</Text>
                            {
                                data?.requests?.length > 0 &&
                                <Image source={icons.arrowdown} style={styles.downIcon} tintColor={colors.black} resizeMode='contain' />
                            }
                        </View>
                        <Text style={styles.desc} numberOfLines={2}>{data?.description}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <View style={styles.flex1}>
                        <View style={[styles.row]}>
                            <Image source={icons.calendarblue} style={styles.icon} resizeMode='contain' />
                            <Text style={styles.text}>
                                {
                                    moment(data?.planAt).format("MMMM DD, YYYY")
                                }
                            </Text>
                        </View>

                    </View>

                    {
                        data?.requests?.length > 0 &&
                        <AvatarGroup
                            data={data?.requests}
                        />
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        label='Edit Plan'
                        containerStyle={styles.button}
                        onPress={() => navigation?.navigate('editplan', { plan_details: data })}
                    />
                    <CustomButton
                        label='Delete Plan'
                        containerStyle={styles.button}
                        onPress={onDelete}
                        loading={loader}
                    />
                </View>

                {
                    expandList &&
                    <Animated.View style={[animatedExpandedListStyle]} >
                        <ExpandedRequest
                            data={data?.requests}
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
        minHeight: 120,
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
        justifyContent: 'space-between',
        // backgroundColor: 'red'
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
        fontSize: 9,
        color: colors.black,
        width: '90%',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        flex: 0.49,
        height: 40
    }
})