import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { icons } from '../constants/icons'

interface ProfessionItemInterface {
    selectedProfession: string,
    item?: any,
    onChooseProfession?: (value: string) => void
}

const ProfessionItem: FC<ProfessionItemInterface> = ({
    item,
    selectedProfession,
    onChooseProfession
}) => {

    const onPress = (data: any) => {
        // console.log("Item pressed: ", data?.title, " | Selected: ", selectedProfession);
        onChooseProfession?.(data?.title)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress?.(item)}>
            <Text style={styles.title}>{item?.title}</Text>
            {
                selectedProfession === item?.title ?
                    <Image source={icons.checkboxfillcheck} style={styles.checkbox} resizeMode='contain' />
                    :
                    <Image source={icons.checkboxfilluncheck} style={styles.checkbox} resizeMode='contain' />
            }

        </TouchableOpacity>
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
        includeFontPadding: false
    },
    checkbox: {
        width: 20,
        height: 20
    }
})