import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'

interface IconButtonInterface {
    label: string,
    onPress?: () => void,
    containerStyle?: any,
    labelStyle?: any,
    enabled?: boolean,
    loading?: boolean,
    loadingColor?: string,
    leftIcon?: () => React.ReactElement | null;
}

const IconButton: FC<IconButtonInterface> = ({
    label = '',
    onPress,
    leftIcon,
    containerStyle,
    labelStyle,
    enabled = true,
    loading = false,
    loadingColor = colors.white
}) => {


    return (
        <TouchableOpacity style={[styles.container, containerStyle, (!enabled || loading) && styles.disabledButton]} disabled={(!enabled || loading)} onPress={onPress}>
            {
                leftIcon &&
                leftIcon()
            }
            {
                loading ?
                    <ActivityIndicator size={'small'} color={loadingColor ?? colors.white} />
                    :
                    <Text style={[styles.labelStyle, labelStyle, leftIcon && styles.ml_10]} allowFontScaling={false}>{label}</Text>

            }
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ml_10: {
        marginLeft: 10
    },
    labelStyle: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.white,
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: colors.grey1
    }
})