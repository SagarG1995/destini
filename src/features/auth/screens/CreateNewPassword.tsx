import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { gif } from '../../../shared/constants/gif'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import { fonts } from '../../../shared/constants/fonts'
import CustomInput from '../../../shared/component/CustomInput'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'

const CreateNewPassword = () => {

    const [password, setPassword] = useState('')
    const [confpassword, setConfPassword] = useState('')
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);


    const eyeIcon = useCallback(() => {
        return <TouchableOpacity style={styles.eyeContainer} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
            <Image source={isPasswordHidden ? icons.eyeshow : icons.eyeshow} style={styles.eye} />
        </TouchableOpacity>
    }, [isPasswordHidden])

    return (
        <View style={styles.container}>
            <Header
                heading='Create New Password'
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <FastImage
                    source={gif.newpassanim}
                    style={styles.gif}
                    resizeMode='contain'
                />
                <Text style={[styles.heading, styles.mt_10]}>Your New Password Must Be Different from Previously Used Password.</Text>
                <View style={styles.form}>
                    <View>
                        <CustomInput
                            placeholder='New Password'
                            rightIcon={eyeIcon}
                            secureTextEntry={isPasswordHidden}
                            onTypingComplete={setPassword}
                        />
                        <CustomInput
                            placeholder='Confirm Password'
                            rightIcon={eyeIcon}
                            secureTextEntry={isPasswordHidden}
                            onTypingComplete={setConfPassword}
                            containerStyle={styles.mt_20}
                        />
                    </View>
                    <CustomButton
                        label='Save'
                    // onPress={() => navigation.navigate('verifyemail')}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default CreateNewPassword


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flexGrow: 1,
        width: '80%',
        alignSelf: 'center'
    },
    gif: {
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_WIDTH * 0.5,
        alignSelf: 'center'
    },
    heading: {
        fontFamily: fonts.light,
        fontSize: 12,
        color: colors.grey1,
        textAlign: 'center',
    },
    mt_10: {
        marginTop: 10
    },
    mt_20: {
        marginTop: 20
    },
    form: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    eyeContainer: {
        padding: 10,
    },
    eye: {
        width: 20,
        height: 20
    },
})