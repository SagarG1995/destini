import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React, { FC, memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import AppStatusBar from './AppStatusBar';

interface RootHeaderInterface {
    children?: React.ReactNode,
    containerStyle?: StyleProp<ViewStyle>
}

const RootHeader: FC<RootHeaderInterface> = ({
    children,
    containerStyle
}) => {

    return (
        <View style={[styles.container, containerStyle]}>
            <AppStatusBar backgroundColor={colors.white} barStyle='dark-content' />
            {
                children
            }
        </View>
    )
}

export default memo(RootHeader)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginHorizontal: 15,
        zIndex: 1,
        // flexDirection: 'row',
        // alignItems: 'center'
    },

})