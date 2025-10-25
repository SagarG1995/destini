/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
} from 'react-native'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../redux/store'

interface LocationSuggestionInterface {
    locationType?: 'current' | 'plan'
    containerStyle?: StyleProp<ViewStyle>
    label?: string
    placeholder?: string,
}

const LocationSuggestion: FC<LocationSuggestionInterface> = ({
    locationType = 'current',
    label,
    placeholder,
    containerStyle,
}) => {

    const navigation = useNavigation<any>()
    const { createPlanLocation } = useAppSelector(state => state?.plan)

    const [value, setValue] = useState<string>('')


    useEffect(() => {
        if (locationType === 'current') {
            setValue(createPlanLocation?.currentLocation)
        } else if (locationType === 'plan') {
            setValue(createPlanLocation?.planLocation)
        }
    }, [locationType, createPlanLocation])

    const onRedirectToChooseLocation = useCallback(() => {
        navigation.navigate('chooselocation', { loc_type: locationType })
    }, [locationType])

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity style={styles.box} onPress={onRedirectToChooseLocation}>
                <Text style={styles.boxLabel} numberOfLines={2}>{value || placeholder}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default memo(LocationSuggestion)

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black,
        includeFontPadding: false,
        marginBottom: 4,
    },
    box: {
        flexDirection: 'row',
        height: 45,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        paddingLeft: 10,
        marginTop: 2
    },
    boxLabel: {
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.regular,
        includeFontPadding: false
    },

})
