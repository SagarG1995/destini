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

const Register = () => {

    const navigation = useNavigation<any>()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [step, setStep] = useState(1)
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);


    const onSubmit = useCallback(() => {
        if (step === 1)
            setStep(prev => prev + 1)
        if (step === 2)
            navigation.navigate('verifyotp')
    }, [step])

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

                        </>
                    }

                </View>
                <View style={styles.footerContent}>

                    <CustomButton
                        label={step === 1 ? 'Submit' : 'Confirm'}
                        onPress={onSubmit}
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
    }
})