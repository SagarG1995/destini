import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import { fonts } from '../../../shared/constants/fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'
import { gif } from '../../../shared/constants/gif'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import CustomInput from '../../../shared/component/CustomInput'
import CustomButton from '../../../shared/component/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { sendForgotPasswordOtp } from '../authApi'
import { _dev_email } from '../../../shared/constants/__dev_variable'
import { showToast } from '../../../shared/utils/toast'

const ForgotPassword = () => {

    const navigation = useNavigation<any>()
    const [email, setEmail] = useState(__DEV__ ? _dev_email : '')
    const [loader, setLoader] = useState(false)

    const handleSend = () => {
        const param = {
            email: email
        }

        setLoader(true)
        sendForgotPasswordOtp(param).then(res => {
            showToast(res?.message)
            if (res?.success) {
                navigation.navigate('verifyemail', { email: email })
            }
        }).finally(() => setLoader(false))
    }

    return (
        <View style={styles.container}>
            <Header
                heading='Forgot Password'
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <FastImage
                    source={gif.forgotpassanim}
                    style={styles.gif}
                    resizeMode='contain'
                />
                <Text style={styles.heading}>Please Enter Your Email Address To Receive a Verification Code.</Text>

                <View style={styles.form}>
                    <CustomInput
                        placeholder='Email'
                        onTypingComplete={setEmail}
                        keyboardType='email-address'
                    />
                    <CustomButton
                        label='Send'
                        loading={loader}
                        // onPress={() => navigation.navigate('verifyemail')}
                        onPress={handleSend}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ForgotPassword

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
        marginTop: 10
    },
    mt_40: {
        marginTop: 40
    },
    form: {
        flex: 1,
        justifyContent: 'space-evenly'
    }
})