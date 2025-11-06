/* eslint-disable react-hooks/rules-of-hooks */
import { ViewStyle, StyleProp, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const RootHeader = ({ children, containerStyle }: { children?: React.ReactNode, containerStyle?: StyleProp<ViewStyle> }) => {

    const insets = useSafeAreaInsets();
    const STATUS_BAR_HEIGHT = insets.top


    return (
        <TouchableOpacity activeOpacity={1} style={[styles.container, containerStyle, { paddingTop: STATUS_BAR_HEIGHT + 10 }]}>
            {
                children
            }
        </TouchableOpacity>
    )
}

export default memo(RootHeader)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        // backgroundColor: 'red',
        paddingBottom: 10,
        zIndex: 1,
    },

})