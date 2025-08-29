import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../shared/component/CustomInput'
import GenderSelection from './GenderSelection'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import ProfessionModal from '../../../shared/component/ProfessionModal'

const ProfileForm1 = () => {

    const [gender, setGender] = useState('female')
    const [nickname, setNickname] = useState('')
    const [fullname, setFullname] = useState('')
    const [isOpen, setIsopen] = useState(false)

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
            <TouchableOpacity style={styles.profession} onPress={() => setIsopen(true)}>
                <Text style={styles.professionLabel}>Profession*</Text>
            </TouchableOpacity>

            {
                <ProfessionModal
                    isOpen={isOpen}
                    toggleModal={() => setIsopen(false)}
                />
            }
        </View>
    )
}

export default ProfileForm1

const styles = StyleSheet.create({
    contianer: {
        justifyContent: 'center',
    },
    profession: {
        marginTop: 50,
        borderBottomColor: colors.black,
        borderBottomWidth: 1
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