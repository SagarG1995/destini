import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, memo, useState } from 'react'
import CustomInput from '../../../shared/component/CustomInput'
import GenderSelection from './GenderSelection'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'

interface ProfileForm1Interface {
    toogleModal?: () => void
}

const ProfileForm1: FC<ProfileForm1Interface> = ({
    toogleModal
}) => {

    const [gender, setGender] = useState('female')
    const [nickname, setNickname] = useState('')
    const [fullname, setFullname] = useState('')

    return (
        <View style={styles.contianer}>
            <GenderSelection
                onSelectedGender={setGender}
            />
            <CustomInput
                placeholder='Nickname*'
                onTypingComplete={setNickname}
                containerStyle={styles.mt_30}
            />
            <CustomInput
                placeholder='Full Name*'
                onTypingComplete={setFullname}
                containerStyle={styles.mt_30}
            />
            <TouchableOpacity style={styles.profession} onPress={toogleModal}>
                <Text style={styles.professionLabel}>Profession*</Text>
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