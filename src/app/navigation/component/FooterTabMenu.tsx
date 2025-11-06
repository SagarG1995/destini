import { View, Text, StyleSheet } from 'react-native'
import React, { memo, useEffect, useMemo } from 'react'
import { colors } from '../../../shared/constants/colors'
import { useLinkBuilder } from '@react-navigation/native'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import { fonts } from '../../../shared/constants/fonts'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_WIDTH = (SCREEN_WIDTH - 20) / 4

const FooterTabMenu = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const translateX = useSharedValue(0);
    const { buildHref } = useLinkBuilder();
    const insets = useSafeAreaInsets();


    const circleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(translateX.value, { duration: 300 }) }],
        };
    }, [translateX]);

    useEffect(() => {
        translateX.value = withTiming(state.index * TAB_WIDTH, { duration: 300 });
    }, [state.index, translateX]);

    const containerStyle = useMemo(() => {
        return {
            height: 60,
            bottom: insets.bottom + 10,
        };
    }, [insets.bottom]);



    return (
        <View style={[styles.container, containerStyle]}>

            <Animated.View style={[styles.circle, circleStyle]} />

            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];


                let icon: React.ReactNode = null;
                if (typeof options.tabBarIcon === 'function') {
                    icon = options.tabBarIcon({
                        focused: isFocused,
                        color: colors.white,
                        size: 24,
                    });
                }


                const onPress = () => {

                    translateX.value = TAB_WIDTH * index;

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <PlatformPressable
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        style={styles.button}
                        key={route.name}
                    >
                        {icon}
                        {isFocused && (
                            <Text style={styles.buttonLabel}>  {route.name}</Text>
                        )}
                    </PlatformPressable>
                );
            })}
        </View>
    )
}

export default memo(FooterTabMenu)

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 20,
        flexDirection: 'row',
        backgroundColor: colors.black2,
        alignSelf: 'center',
        borderRadius: 10,
        boxShadow: [
            {
                offsetX: 2,
                offsetY: 7,
                blurRadius: 20,
                spreadDistance: 1,
                color: "rgba(0,0,0,0.5)",
            },
        ],
    },
    button: {
        width: (SCREEN_WIDTH - 20) / 4,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        width: 20,
        height: 20
    },
    buttonLabel: {
        fontFamily: fonts.semibold,
        fontSize: 12,
        color: colors.white,
        textTransform: 'capitalize',
        includeFontPadding: false,
    },
    circle: {
        position: "absolute",
        top: (60 - 40) / 2,
        left: 10,
        width: TAB_WIDTH - 15,
        height: 40,
        backgroundColor: colors.blue1,
        borderRadius: 100,
        zIndex: 0
    },
})