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

const Login = () => {

    const navigation = useNavigation<any>()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);


    const subHeading = useCallback(() => {
        return (
            <View style={styles.subheadingContainer}>
                <Text style={styles.subHeading}>
                    Destini to plan, meet & grow with <Text style={styles.blackText}>like-minded professionals</Text> nearby
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
                heading='Where connections find'
                highlightText='Purpous'
                subHeadingComponent={subHeading}
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.content}>
                <View style={styles.form}>
                    <CustomInput
                        placeholder='Email'
                        onTypingComplete={setEmail}
                        keyboardType='email-address'
                    />
                    <CustomInput
                        placeholder='Password'
                        onTypingComplete={setPassword}
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