import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { FC, memo, useCallback, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import IconButton from '../../../shared/component/IconButton'
import { icons } from '../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'
import { signInWithGoogle } from '../../../shared/utils/firebaseAuthHelper'
import { googleLogin } from '../authApi'
import { useAppDispatch } from '../../../redux/store'
import { setAuthData } from '../authSlice'
import { showToast } from '../../../shared/utils/toast'

interface SocialLoginInterface {
    isLoginScreen?: boolean
}


const SocialLogin: FC<SocialLoginInterface> = ({
    isLoginScreen = true
}) => {

    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()

    const [isGoogleLogin, setIsGoogleLogin] = useState(false)


    const continueGoogle = async () => {
        setIsGoogleLogin(true)
        try {

            const signInResponse = await signInWithGoogle()
            // console.log(signInResponse);

            if (signInResponse?.success) {
                const param = {
                    idToken: signInResponse?.idToken,
                    provider: 'google'
                }

                setIsGoogleLogin(true)
                googleLogin(param).then(async (res) => {

                    if (res?.success && res?.status === 200) {
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
                }).finally(() => setIsGoogleLogin(false))
            } else {
                if (signInResponse?.error?.type !== 'cancelled') {
                    Alert.alert('signInResponse Error: ', JSON.stringify(signInResponse?.error?.code ?? signInResponse?.error))
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsGoogleLogin(false)
        }
    }



    const googleIcon = useCallback(() => {
        return <Image source={icons.google} style={styles.icon} resizeMode='contain' />
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.divider} />
                <Text style={styles.divideText}>or log in with</Text>
                <View style={styles.divider} />
            </View>
            <IconButton
                label='Continue With Google'
                containerStyle={styles.mt_30}
                leftIcon={googleIcon}
                onPress={continueGoogle}
                loading={isGoogleLogin}
            />
            {
                isLoginScreen ?
                    <TouchableOpacity onPress={() => navigation.navigate("register")}>
                        <Text style={styles.optionLabel}> Don’t have an account ? <Text style={styles.blackText}>Sign Up</Text></Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.navigate('login')}>
                        <Text style={styles.optionLabel}>Already have an account? <Text style={styles.blackText}>Login</Text></Text>
                    </TouchableOpacity>
            }

        </View>
    )
}

export default memo(SocialLogin)

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        flex: 1,
        height: 2,
        backgroundColor: colors.black
    },
    divideText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.black,
        marginHorizontal: 10
    },
    mt_30: {
        marginTop: 30
    },
    icon: {
        width: 25,
        height: 25
    },
    optionLabel: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.grey1,
        textAlign: 'center',
        marginTop: 20
    },
    blackText: {
        color: colors.black,
    }
})