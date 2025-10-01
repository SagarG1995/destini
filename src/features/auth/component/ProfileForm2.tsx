import { View, StyleSheet, } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../../shared/constants/colors'
import CustomInput from '../../../shared/component/CustomInput'
import DOBInput from './DOBInput'
import CustomButton from '../../../shared/component/CustomButton'

interface ProfileForm2Interface {
    onDescription?: (value: string) => void,
    onDob?: (value: string) => void,
    onPress?: () => void
}

const ProfileForm2: FC<ProfileForm2Interface> = ({
    onDescription,
    onDob,
    onPress
}) => {

    const changeDob = (_dob: any) => {
        onDob?.(_dob?.fullDate)
    }

    const changeDescription = (e: string) => {
        onDescription?.(e)
    }

    return (
        <View style={styles.container}>
            <View style={styles.describeBox}>
                <CustomInput
                    multiline
                    numberOfLines={5}
                    placeholder='Describe Yourself In 250 Characters'
                    textAlignVertical='top'
                    maxLength={250}
                    onTypingComplete={changeDescription}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputContainerStyle}
                />
            </View>
            <DOBInput
                onChangeDOB={changeDob}
            />

            <View style={styles.footer}>

                <CustomButton
                    label='Let’s Get Started'
                    // onPress={() => navigation.navigate('tabs')}
                    onPress={onPress}
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