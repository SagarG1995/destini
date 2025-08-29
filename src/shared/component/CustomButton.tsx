import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'

interface CustomButtonInterface {
    label: string,
    onPress?: () => void,
    containerStyle?: any,
    labelStyle?: any,
    enabled?: boolean,
    loading?: boolean,
    loadingColor?: string,
}

const CustomButton: FC<CustomButtonInterface> = ({
    label = '',
    onPress,
    containerStyle,
    labelStyle,
    enabled = true,
    loading = false,
    loadingColor = colors.white
}) => {

    return (
        <TouchableOpacity style={[styles.container, containerStyle, (!enabled || loading) && styles.disabledButton]} disabled={(!enabled || loading)} onPress={onPress}>
            {
                loading ?
                    <ActivityIndicator size={'small'} color={loadingColor ?? colors.white} />
                    :
                    <Text style={[styles.labelStyle, labelStyle]} allowFontScaling={false}>{label}</Text>

            }
        </TouchableOpacity>
    )
}

export default memo(CustomButton)


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        height: 45,
        paddingHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'center'
    },
    labelStyle: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.white,
        textAlign: 'center'
    },
    disabledButton: {
        backgroundColor: colors.grey1
    }
})