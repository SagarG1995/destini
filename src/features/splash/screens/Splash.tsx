import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '../../../shared/constants/images'
import { colors } from '../../../shared/constants/colors'
import { useNavigation } from '@react-navigation/native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { runOnJS } from 'react-native-worklets'

const Splash = () => {

    const navigation = useNavigation<any>()
    const translateY = useSharedValue(0)
    const opacity = useSharedValue(1)

    useEffect(() => {
        const timer = setTimeout(() => {
            translateY.value = withTiming(20, { duration: 400 }, () => {
                // Step 2: then bounce up
                translateY.value = withSpring(
                    -60,
                    {
                        damping: 3,      // more bounce if lower
                        stiffness: 100,  // speed of spring
                    }
                )
            })

            // fade out (runs while moving up)
            opacity.value = withTiming(
                0,
                { duration: 1000, easing: Easing.linear },
                () => {
                    runOnJS(navigation.replace)('onboarding')
                }
            )
        }, 2000) // ⏳ delay 2s before starting animation

        return () => clearTimeout(timer)
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        }
    })

    return (
        <View style={styles.container}>
            <Animated.Image
                source={images.logo}
                resizeMode='contain'
                style={[styles.logo, animatedStyle]}
            />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    logo: {
        width: 150,
        height: 150,
        // backgroundColor: 'red'
    }
})