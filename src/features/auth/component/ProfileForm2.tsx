import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import CustomInput from '../../../shared/component/CustomInput'
import DOBInput from './DOBInput'
import CustomButton from '../../../shared/component/CustomButton'
import { useNavigation } from '@react-navigation/native'

const ProfileForm2 = () => {

    const navigation = useNavigation<any>()
    const [description, setDescription] = useState('')
    const [dob, setDob] = useState('')



    return (
        <View style={styles.container}>
            <View style={styles.describeBox}>
                <CustomInput
                    multiline
                    numberOfLines={5}
                    placeholder='Describe Yourself In 250 Characters'
                    textAlignVertical='top'
                    maxLength={250}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainerStyle}
                />
            </View>
            <DOBInput
                onChangeDOB={(_dob: any) => setDob(_dob?.fullDate)}
            />

            <View style={styles.footer}>

                <CustomButton
                    label='Let’s Get Started'
                    onPress={() => navigation.navigate('tabs')}
                />
            </View>


        </View>
    )
}

export default ProfileForm2

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
    },
    describeBox: {
        height: 206,
        borderRadius: 10,
        borderColor: colors.grey5,
        borderWidth: 0.5,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        overflow: 'hidden'
    },
    inputContainerStyle: {
        flex: 1,
        height: undefined,
        borderBottomWidth: 0,
        alignItems: undefined,
        // backgroundColor: 'red'
    },
    inputStyle: {
        flex: 1,
        textAlignVertical: 'top',
        paddingLeft: 10,
        fontSize: 12
    },
    footer: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end'
    }
})