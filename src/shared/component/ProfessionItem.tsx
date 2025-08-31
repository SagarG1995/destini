import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { icons } from '../constants/icons'

interface ProfessionItemInterface {
    item?: any
}

const ProfessionItem: FC<ProfessionItemInterface> = ({
    item
}) => {

    // console.log(item);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item?.title}</Text>
            <Image source={icons.checkboxfilluncheck} style={styles.checkbox} resizeMode='contain' />
        </View>
    )
}

export default ProfessionItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.grey3,
        // marginTop: 2
        includeFontPadding: false
    },
    checkbox: {
        width: 20,
        height: 20
    }
})