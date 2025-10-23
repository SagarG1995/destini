import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, memo, useEffect, useState } from 'react'
import CustomInput from '../../../shared/component/CustomInput'
import GenderSelection from './GenderSelection'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'

interface ProfileForm1Interface {
    profession?: string,
    toogleModal?: () => void,
    onNickName?: (value: string) => void,
    onFullName?: (value: string) => void,
    onGender?: (value: string) => void,
    // onNickName?: (value: string) => void
}

const ProfileForm1: FC<ProfileForm1Interface> = ({
    profession = '',
    toogleModal,
    onFullName,
    onGender,
    onNickName,
}) => {

    // useEffect(() => {
    //     console.log('ProfileForm1 =>> ', profession);

    // }, [])

    return (
        <View style={styles.contianer}>
            <GenderSelection
                onSelectedGender={onGender}
            />
            <CustomInput
                placeholder='Nickname*'
                onTypingComplete={onNickName}
                containerStyle={styles.mt_30}
            />
            <CustomInput
                placeholder='Full Name*'
                onTypingComplete={onFullName}
                containerStyle={styles.mt_30}
            />
            <TouchableOpacity style={styles.profession} onPress={toogleModal}>
                <Text style={styles.professionLabel}>{profession || 'Profession*'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default memo(ProfileForm1)

const styles = StyleSheet.create({
    contianer: {
        justifyContent: 'center',
    },
    profession: {
        marginTop: 45,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        paddingLeft: 10,
        borderRadius: 10,
    },
    professionLabel: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.black
    },
    mt_30: {
        marginTop: 30
    },
})