import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, memo, useState } from 'react'
import { images } from '../../../shared/constants/images'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'

interface GenderSelectionInterface {
    onSelectedGender?: (gender: string) => void
}

const GenderSelection: FC<GenderSelectionInterface> = ({
    onSelectedGender
}) => {

    const [gender, setGender] = useState('female')

    const onSelect = (gender: string) => {
        setGender(gender)
        onSelectedGender?.(gender)
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.box} onPress={() => onSelect('female')}>
                    <Image
                        source={images.girl}
                        style={[styles.image, gender === 'female' && styles.active]}
                        resizeMode='contain'
                    />
                    <Text style={[styles.label, gender === 'female' && styles.activeLabel]}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box} onPress={() => onSelect('male')}>
                    <Image
                        source={images.boy}
                        style={[styles.image, gender === 'male' && styles.active]}
                        resizeMode='contain'
                    />
                    <Text style={[styles.label, gender === 'male' && styles.activeLabel]}>Male</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(GenderSelection)

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    box: {
        width: 140,
        height: 170,
        alignItems: 'center',
    },
    image: {
        width: 90,
        height: 90,
    },
    active: {
        width: 120,
        height: 120,
        borderRadius: 120,
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 0,
                blurRadius: 10,
                spreadDistance: 0,
                color: colors.blue1,
            },
        ],
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: colors.transparentBlack1,
        textAlign: 'center',
        marginTop: 'auto'
    },
    activeLabel: {
        color: colors.black
    }
})