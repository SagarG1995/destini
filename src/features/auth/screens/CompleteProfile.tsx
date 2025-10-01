import { View, Text, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { gif } from '../../../shared/constants/gif'
import ProfileForm1 from '../component/ProfileForm1'
import ProfileForm2 from '../component/ProfileForm2'
import { runOnJS } from 'react-native-worklets'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { showToast } from '../../../shared/utils/toast'
import { completeProfile } from '../authApi'
import { setAuthData } from '../authSlice'

const CompleteProfile = () => {

    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state?.auth)

    const [step, setStep] = useState(1)
    const [isOpen, setIsopen] = useState(false)
    const [nickname, setNickname] = useState('')
    const [fullname, setFullname] = useState('')
    const [prof, setProf] = useState('')
    const [desc, setDesc] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')

    const onSwipeUp = () => {
        if (step === 1) {
            if (!nickname) {
                showToast("Please provide nickname")
                return
            }
            else if (!fullname) {
                showToast("Please provide full name")
                return
            }
            else if (!prof) {
                showToast("Please choose your profession")
                return
            } else if (nickname && fullname && prof) {
                console.log(fullname, nickname, prof);

                setStep(prev => prev + 1)
            }
        }
    }

    const onCompleteProfile = () => {
        if (!desc) {
            showToast("Please provide description")
            return
        }
        else if (!dob) {
            showToast("Please provide DOB")
            return
        }
        const param = {
            full_name: fullname,
            nickname: nickname,
            professions: prof,
            description: desc,
            dob: dob,
            gender: gender
        }
        completeProfile(param).then(res => {
            if (res?.success) {
                dispatch(setAuthData({ ...auth.authdata, completeProfile: true }))
            }
            showToast(res?.message)
        })
    }

    const swipe = Gesture.Pan()
        .onEnd((e) => {
            if (e.translationY < -50) { // negative Y = swipe up
                console.log('User swiped up!');
                runOnJS(onSwipeUp)();
            }
        });

    const subHeading = useCallback(() => {
        return (
            <Text style={styles.subHeading}>This helps others know who you are and what you’re interested in.
            </Text>
        )
    }, [])

    const toogleModal = useCallback(() => {
        setIsopen(!isOpen)
    }, [isOpen])

    return (
        <View style={styles.container}>
            <Header
                heading='Complete Your Profile'
                showBack={false}
                subHeadingComponent={subHeading}
                headingStyle={styles.headingStyle}
            />
            <GestureDetector gesture={swipe}>
                <KeyboardAwareScrollView contentContainerStyle={styles.content}>

                    {
                        step === 1 ?
                            <ProfileForm1
                                profession={prof}
                                toogleModal={toogleModal}
                                onFullName={setFullname}
                                onNickName={setNickname}
                                onGender={setGender}
                            />
                            :
                            <ProfileForm2
                                onDescription={setDesc}
                                onDob={setDob}
                                onPress={onCompleteProfile}
                            />
                    }

                    {
                        step === 1 &&
                        <View style={styles.swipeInfoContainer}>
                            <FastImage
                                source={gif.swipeup}
                                style={styles.gif}
                                resizeMode='contain'
                            />
                            <Text style={styles.swipeInfo}>Swipe Up To Fill More Details</Text>
                        </View>
                    }

                </KeyboardAwareScrollView>
            </GestureDetector>
            <ProfessionModal
                isOpen={isOpen}
                toggleModal={toogleModal}
                onChooseProfession={setProf}
            />
        </View>
    )
}

export default CompleteProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    subHeading: {
        fontFamily: fonts.light,
        fontSize: 12,
        color: colors.grey1,
        includeFontPadding: false
    },
    headingStyle: {
        textAlign: 'left'
    },
    content: {
        flexGrow: 1,
        width: '80%',
        alignSelf: 'center',
        paddingBottom: 40,
        // backgroundColor: 'red'
    },
    swipeInfoContainer: {
        alignItems: 'center',
        marginTop: 'auto',
    },
    gif: {
        width: 40,
        height: 40
    },
    swipeInfo: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.blue1,
        marginTop: 8
    }

})