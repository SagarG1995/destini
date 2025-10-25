/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../component/Header'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomInput from '../../../shared/component/CustomInput'
import { icons } from '../../../shared/constants/icons'
import CustomButton from '../../../shared/component/CustomButton'
import SocialLogin from '../component/SocialLogin'
import AgreementText from '../../onboarding/component/AgreementText'
import { useNavigation } from '@react-navigation/native'
import { login } from '../authApi'
import { showToast } from '../../../shared/utils/toast'
import { setAuthData } from '../authSlice'
import { useAppDispatch } from '../../../redux/store'
import { _dev_email, _dev_password } from '../../../shared/constants/__dev_variable'

const Login = () => {

    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState(__DEV__ ? _dev_email : '')
    const [password, setPassword] = useState(__DEV__ ? _dev_password : '')
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [loader, setLoader] = useState(false)


    const handleLogin = useCallback(() => {

        const param = {
            email,
            password,
        }
        setLoader(true)
        login(param).then(res => {
            // console.log(res);

            if (res?.success) {
                dispatch(setAuthData({
                    completeProfile: res?.data?.user?.completeProfile,
                    access_token: res?.data?.token,
                    refresh_token: res?.data?.refresh_token ?? ''
                }))
                if (!res?.data?.user?.completeProfile) {
                    navigation.navigate('completeprofile')
                }
            } else {
                showToast(res?.message)
            }

        }).catch(err => {
            console.log(err);

        }).finally(() => setLoader(false))

    }, [email, password])

    const subHeading = useCallback(() => {
        return (
            <Text style={styles.subHeading}>
                Destini to plan, meet & grow with <Text style={styles.blackText}>like-minded professionals</Text> nearby
            </Text>
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
                heading='Where connections find'
                showBack={false}
                highlightText='Purpous'
                headingStyle={styles.headingStyle}
                subHeadingComponent={subHeading}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <View style={styles.form}>
                    <CustomInput
                        value={email}
                        placeholder='Email'
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        textAlignVertical='bottom'
                    />
                    <CustomInput
                        value={password}
                        placeholder='Password'
                        onChangeText={setPassword}
                        containerStyle={styles.mt_30}
                        rightIcon={eyeIcon}
                        secureTextEntry={isPasswordHidden}
                    />
                    <TouchableOpacity style={styles.forgotContainer} onPress={() => navigation.navigate('forgotpassword')}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.footerContent}>

                    <CustomButton
                        label='Log In'
                        // onPress={() => navigation.navigate('tabs')}
                        onPress={handleLogin}
                        loading={loader}
                    />
                    <SocialLogin />

                    <AgreementText />

                </View>
            </KeyboardAwareScrollView>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mt_30: {
        marginTop: 30
    },
    headingStyle: {
        textAlign: 'left'
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
    eyeContainer: {
        padding: 10,
    },
    eye: {
        width: 20,
        height: 20
    },
    forgotContainer: {
        alignSelf: 'flex-end',
        paddingVertical: 14
    },
    forgotText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.black
    },
    footerContent: {
        height: '50%',
    }
})