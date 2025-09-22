import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import { fonts } from '../../../shared/constants/fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomOtpInput from '../component/CustomOtpInput'
import CustomButton from '../../../shared/component/CustomButton'
import SocialLogin from '../component/SocialLogin'
import { useNavigation, useRoute } from '@react-navigation/native'
import { verifyOtp } from '../authApi'
import { showToast } from '../../../shared/utils/toast'
import { useDispatch } from 'react-redux'
import { setAuthData } from '../authSlice'
import { useAppDispatch } from '../../../redux/store'

const VerifyOtp = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const { email } = useRoute<any>()?.params

    const [otp, setOtp] = useState('')
    const [loader, setLoader] = useState(false)

    const handleVerifyOtp = () => {
        const param = {
            email: email,
            code: otp
        }
        setLoader(true)
        verifyOtp(param).then(res => {
            console.log(res);

            showToast(res?.message)
            if (res?.success) {
                dispatch(setAuthData({
                    completeProfile: res?.data?.user?.completeProfile,
                    access_token: res?.data?.token,
                    refresh_token: res?.data?.refresh_token ?? ''
                }))
                // navigation.navigate("completeprofile")
            }
        }).finally(() => setLoader(false))
    }


    const subHeading = useCallback(() => {
        return (
            <View style={styles.subheadingContainer}>
                <Text style={styles.subHeading}>
                    Your key to Destini was sent to
                    <Text style={styles.blackText}>‘abc@gmail.com’</Text> Enter it to unlock.
                </Text>
            </View>
        )
    }, [])

    return (
        <View style={styles.container}>
            <Header
                heading='We have sent you an OTP,'
                highlightText='Let’s Verify'
                subHeadingComponent={subHeading}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>

                <View style={styles.form}>
                    <CustomOtpInput
                        onFillOTP={(e) => setOtp(e)}
                    />
                </View>
                <View style={styles.footerContent}>

                    <CustomButton
                        label={'Verify'}
                        onPress={handleVerifyOtp}
                        loading={loader}
                    />
                    {/* <SocialLogin
                        isLoginScreen={false}
                    /> */}

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    subheadingContainer: {
        flex: 1,
        marginLeft: 8,
        justifyContent: 'center',
    },
    subHeading: {
        fontFamily: fonts.light,
        fontSize: 12,
        color: colors.grey1
    },
    blackText: {
        fontFamily: fonts.regular,
        color: colors.black
    },
    content: {
        flexGrow: 1,
        width: '80%',
        alignSelf: 'center'
    },
    form: {
        height: '50%',
        paddingTop: 50,
    },
    footerContent: {
        height: '50%',
    }
})