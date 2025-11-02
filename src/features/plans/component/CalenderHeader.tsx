import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { colors } from '../../../shared/constants/colors'
import AppStatusBar from '../../../shared/component/AppStatusBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import { useNavigation } from '@react-navigation/native'

interface CalenderHeaderInterface {
    selectedMonth?: string,
    heading?: string
}

const CalenderHeader: FC<CalenderHeaderInterface> = ({
    selectedMonth,
    heading = 'Create a plan'
}) => {

    const navigation = useNavigation<any>()
    const insets = useSafeAreaInsets()

    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top + 20 }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <AppStatusBar backgroundColor={colors.black} barStyle='light-content' />
            <TouchableOpacity style={styles.row} onPress={() => navigation.goBack()}>
                <Image source={icons.arrowback} style={styles.icon} resizeMode='contain' tintColor={colors.white} />
                <Image source={icons.calenderheart} style={[styles.icon, styles.ml_10]} resizeMode='contain' tintColor={colors.white} />
                <Text style={styles.heading}>{heading}</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>{selectedMonth}</Text>
        </View>
    )
}

export default memo(CalenderHeader)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ml_10: {
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
    heading: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.white,
        includeFontPadding: false,
        marginLeft: 10,
    },
    dateLabel: {
        fontFamily: fonts.semibold,
        fontSize: 14,
        color: colors.white,
        includeFontPadding: false
    },
})