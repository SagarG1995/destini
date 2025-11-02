/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import { fonts } from '../../../shared/constants/fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomInput from '../../../shared/component/CustomInput'
import CustomButton from '../../../shared/component/CustomButton'
import SocialLogin from '../component/SocialLogin'
import AgreementText from '../../onboarding/component/AgreementText'
import { icons } from '../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'
import { showToast } from '../../../shared/utils/toast'
import VerifyEmail from './VerifyEmail'
import { validateEmail, validatePassword } from '../Validator'
import { register } from '../authApi'
import { _dev_email, _dev_password } from '../../../shared/constants/__dev_variable'

const Register = () => {

    const navigation = useNavigation<any>()

    const [email, setEmail] = useState(__DEV__ ? _dev_email : '')
    const [password, setPassword] = useState(__DEV__ ? _dev_password : '')
    const [confPassword, setConfPassword] = useState(__DEV__ ? _dev_password : '')
    const [step, setStep] = useState(1)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [loader, setLoader] = useState(false)


    const onSubmit = useCallback(() => {
        if (step === 1) {
            const validate = validateEmail(email)
            if (validate === true) {
                setStep(prev => prev + 1)
            } else {
                showToast(validate)
            }
        }
        if (step === 2) {
            const validate = validatePassword(password)
            if (validate !== true) {
                showToast(validate)
            }
            else if (validate === true) {
                if (password !== confPassword) {
                    showToast("Confirm password does not matched with password.")
                    return
                } else {
                    handleRegistration()
                }
            }
        }
    }, [step, email, password, confPassword])

    const handleRegistration = useCallback(() => {

        const param = {
            email,
            password,
            confirmPassword: confPassword
        }
        // console.log(param);

        setLoader(true)
        register(param).then(res => {
            showToast(res?.message)
            if (res?.success) {
                navigation.navigate('verifyotp', { email: email })
            }

        }).catch(err => {
            console.log(err);

        }).finally(() => setLoader(false))

    }, [email, password, confPassword])

    const subHeading = useCallback(() => {
        return (
            <View style={styles.subheadingContainer}>
                <Text style={styles.subHeading}>
                    We only use your mail to make sure everyone on <Text style={styles.blackText}>destini</Text> is real
                </Text>
            </View>
        )
    }, [])

    const eyeIcon = useCallback(() => {
        return <TouchableOpacity style={styles.eyeContainer} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
            <Image source={isPasswordHidden ? icons.eyeshow : icons.eyeshow} style={styles.eye} />
        </TouchableOpacity>
    }, [isPasswordHidden])

    return (
        <View style={styles.container}>
            <Header
                heading='Can we get your E-mail,'
                highlightText='Please?'
                subHeadingComponent={subHeading}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <View style={styles.form}>
                    <CustomInput
                        placeholder='Email'
                        onTypingComplete={setEmail}
                        keyboardType='email-address'
                    />
                    {
                        step === 2 &&
                        <>
                            <CustomInput
                                placeholder='Password'
                                onTypingComplete={setPassword}
                                containerStyle={styles.mt_30}
                                rightIcon={eyeIcon}
                                secureTextEntry={isPasswordHidden}
                            />
                            <CustomInput
                                placeholder='Confirm Password'
                                onTypingComplete={setConfPassword}
                                containerStyle={styles.mt_30}
                                rightIcon={eyeIcon}
                                secureTextEntry={isPasswordHidden}
                            />
                            <Text style={styles.info}>Must contain 5 characters, one number , one uppercase , one lowercase character</Text>
                        </>
                    }

                </View>
                <View style={styles.footerContent}>

                    <CustomButton
                        label={step === 1 ? 'Submit' : 'Confirm'}
                        onPress={onSubmit}
                        loading={loader}
                    />
                    <SocialLogin
                        isLoginScreen={false}
                    />

                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mt_30: {
        marginTop: 30
    },
    eyeContainer: {
        padding: 10,
    },
    eye: {
        width: 20,
        height: 20
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
        paddingTop: 50
    },
    footerContent: {
        height: '50%',
    },
    info: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: fonts.regular,
        includeFontPadding: false,
        color: colors.black
    }
})