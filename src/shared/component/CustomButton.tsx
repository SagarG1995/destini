import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
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
    badgeCount?: number,
    leftIcon?: React.ReactNode
}

const CustomButton: FC<CustomButtonInterface> = ({
    label = '',
    onPress,
    containerStyle,
    labelStyle,
    enabled = true,
    loading = false,
    badgeCount = 0,
    loadingColor = colors.white,
    leftIcon
}) => {

    const badge = useMemo(() => {
        if (badgeCount > 99) {
            return "99+"
        } else {
            return badgeCount
        }
    }, [badgeCount])

    return (
        <TouchableOpacity style={[styles.container, containerStyle, (!enabled || loading) && styles.disabledButton]} disabled={(!enabled || loading)} onPress={onPress}>
            {
                (typeof badgeCount === 'number' && badgeCount !== 0) &&
                <View style={styles.badgeContainer}>
                    <Text style={styles.badge} adjustsFontSizeToFit>{badge}</Text>
                </View>
            }
            {
                leftIcon &&
                leftIcon
            }
            {
                loading ?
                    <ActivityIndicator size={'small'} color={loadingColor ?? colors.white} />
                    :
                    <Text style={[styles.labelStyle, labelStyle]} allowFontScaling={false} numberOfLines={1}>{label}</Text>

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
    badgeContainer: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 1,
        backgroundColor: colors.red1,
        borderColor: colors.white,
        borderWidth: 2
    },
    badge: {
        fontFamily: fonts.bold,
        fontSize: 10,
        color: colors.white,
        includeFontPadding: false,
    },
    labelStyle: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.white,
        textAlign: 'center',
        includeFontPadding: false,
    },
    disabledButton: {
        backgroundColor: colors.grey1
    }
})