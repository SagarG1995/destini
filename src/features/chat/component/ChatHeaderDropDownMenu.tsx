/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import React, { FC, useMemo, useRef, useState } from 'react'
import { icons } from '../../../shared/constants/icons'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../shared/constants/dimensions';
import { useAppSelector } from '../../../redux/store';
import { exitFromPlan } from '../../plans/plansApi';
import { showToast } from '../../../shared/utils/toast';
import { useNavigation } from '@react-navigation/native';

interface ChatHeaderDropDownMenuInterface {
    data?: any
}

const ChatHeaderDropDownMenu: FC<ChatHeaderDropDownMenuInterface> = ({
    data = null
}) => {

    const navigation = useNavigation<any>()
    const { userdata } = useAppSelector(state => state.profile)
    const buttonRef = useRef(null);
    const dropdownProgress = useSharedValue(0);
    const [isOpen, setIsOpen] = useState(false);
    const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const isOwner = useMemo(() => {
        if (userdata?.userId === data?.creatorId) {
            return true
        } else {
            return false
        }

    }, [data?.creatorId, userdata?.userId])

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        dropdownProgress.value = withTiming(!isOpen ? 1 : 0, { duration: 200 });
    };

    const dropdownStyle = useAnimatedStyle(() => {
        return {
            opacity: dropdownProgress.value,
            transform: [
                {
                    translateY: interpolate(
                        dropdownProgress.value,
                        [0, 1],
                        [-10, 0],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    const closeDropdown = () => {
        setIsOpen(false);
        dropdownProgress.value = withTiming(0, { duration: 200 });
    };

    const exitPlan = () => {
        exitFromPlan(data?.planId).then(res => {
            console.log(res);

            if (res?.success) {
                console.log(res);
                navigation.goBack()
            } else {
                showToast(res?.message)
            }
        })
    }


    return (
        <>
            <TouchableOpacity
                ref={buttonRef}
                onPress={toggleDropdown}
                onLayout={(event) => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    setButtonLayout({ x, y, width, height });
                }}
                style={styles.button}
            >
                <Image source={icons.dots} style={styles.dotIcon} resizeMode='contain' />
            </TouchableOpacity>

            {
                isOpen &&
                <>
                    <TouchableWithoutFeedback onPress={closeDropdown}>
                        <View style={styles.backdrop} pointerEvents='auto' />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            styles.dropdown,
                            dropdownStyle,
                            {
                                position: 'absolute',
                                top: buttonLayout.y + buttonLayout.height + 12,
                                width: 200,
                                right: 10,
                                zIndex: 999,
                            },
                        ]}
                    >
                        {
                            isOwner &&
                            <TouchableOpacity style={styles.menuItem}>
                                <Image source={icons.cancel} style={styles.icon20} resizeMode='contain' />
                                <Text style={styles.menuText}>Cancel Plan</Text>
                            </TouchableOpacity>
                        }
                        {/* <TouchableOpacity style={styles.menuItem}>
                            <Image source={icons.nosound} style={styles.icon20} resizeMode='contain' />
                            <Text style={styles.menuText}>Mute Group</Text>
                        </TouchableOpacity> */}
                        {
                            !isOwner &&
                            <TouchableOpacity style={styles.menuItem} onPress={exitPlan}>
                                <Image source={icons.exit} style={styles.icon13} resizeMode='contain' />
                                <Text style={styles.menuText}>Exit Plan</Text>
                            </TouchableOpacity>
                        }

                    </Animated.View>
                </>
            }

        </>
    )
}

export default ChatHeaderDropDownMenu

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        overflow: 'hidden',
        // backgroundColor: 'pink'
    },
    dotIcon: {
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    icon13: {
        width: 13,
        height: 13,
        marginLeft: 5
    },
    icon20: {
        width: 20,
        height: 20,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        zIndex: 999, // must be < dropdown zIndex
        // backgroundColor: 'pink'
    },
    dropdown: {
        backgroundColor: colors.black,
        borderRadius: 8,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        borderColor: colors.blue1,
        borderWidth: 1,
        overflow: 'hidden'
    },
    menuItem: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.white,
        includeFontPadding: false,
        marginLeft: 5
    },
})