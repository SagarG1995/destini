import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import FastImage from 'react-native-fast-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { gif } from '../../../shared/constants/gif'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import { fonts } from '../../../shared/constants/fonts'
import CustomOtpInput from '../component/CustomOtpInput'
import CustomButton from '../../../shared/component/CustomButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import { verifyForgotPasswordOtp } from '../authApi'
import { showToast } from '../../../shared/utils/toast'
import { useAppDispatch } from '../../../redux/store'
import { setResetToken } from '../authSlice'

const VerifyEmail = () => {

    const { email } = useRoute<any>()?.params
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [otp, setOtp] = useState('')


    const handleVerify = () => {
        const param = {
            email: email,
            code: otp
        }

        setLoader(true)
        verifyForgotPasswordOtp(param).then(res => {
            showToast(res?.message)
            if (res?.success) {
                dispatch(setResetToken(res?.data?.resetToken))
                navigation.navigate('createnewpassword')
            }
        }).finally(() => setLoader(false))
    }

    return (
        <View style={styles.container}>
            <Header
                heading='Verify Your Email'
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <FastImage
                    source={gif.verifyemailanim}
                    style={styles.gif}
                    resizeMode='contain'
                />
                <Text style={[styles.heading, styles.mt_10]}>Please Enter The 6 Digit Code Sent To</Text>
                <Text style={[styles.heading, styles.boldText]}>{email ?? ''}</Text>


                <View style={styles.form}>
                    <CustomOtpInput
                        onFillOTP={(e) => setOtp(e)}
                    />
                    <View>
                        <CustomButton
                            label='Verify'
                            // onPress={() => navigation.navigate('createnewpassword')}
                            onPress={handleVerify}
                            loading={loader}
                        />
                        <TouchableOpacity style={styles.resendButton}>
                            <Text style={styles.resendButtonLabel}>Resend <Text style={styles.codeText}>Code</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default VerifyEmail

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
    boldText: {
        fontFamily: fonts.bold
    },
    mt_10: {
        marginTop: 10
    },
    form: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    resendButton: {
        alignSelf: 'center',
        marginTop: 10,
        padding: 10
    },
    resendButtonLabel: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.grey2
    },
    codeText: {
        color: colors.black,
        textDecorationLine: 'underline'
    }
})