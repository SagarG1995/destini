import { View, Text, StyleSheet } from 'react-native'
import React, { FC, memo } from 'react'
import { fonts } from '../constants/fonts'
import { colors } from '../constants/colors'

interface ProfessionItemHeadInterface {
    title?: string
}

const ProfessionItemHead: FC<ProfessionItemHeadInterface> = ({
    title = ''
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default memo(ProfessionItemHead)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: colors.black,
        paddingHorizontal: 10
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.grey3,
        includeFontPadding: false
    }
})