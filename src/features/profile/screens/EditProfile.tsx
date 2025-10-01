import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CacheImage from '../../../shared/component/CacheImage'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import CustomInput from '../../../shared/component/CustomInput'
import { fonts } from '../../../shared/constants/fonts'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'
import { useAppSelector } from '../../../redux/store'

const EditProfile = () => {

    const avgCharWidth = 9; // adjust based on font
    const lineHeight = 20;
    const { userdata } = useAppSelector(state => state?.profile)

    const [name, setName] = useState(userdata?.full_name)
    const [profession, setProfession] = useState(userdata?.professions)
    const [description, setDescription] = useState(userdata?.description)
    const [isOpen, setIsopen] = useState(false)


    const descriptionBoxHeight = useMemo(() => {
        const charsPerLine = Math.floor(SCREEN_WIDTH / avgCharWidth);
        const linesNeeded = Math.ceil(250 / charsPerLine);
        return { height: linesNeeded * lineHeight };
    }, []);



    return (
        <View style={styles.container}>
            <Header isEditing />
            <KeyboardAwareScrollView style={styles.mt_20} contentContainerStyle={styles.content}>
                <View style={styles.form}>
                    <View style={styles.row}>
                        <View style={styles.imageContainer}>
                            <CacheImage
                                uri={userdata?.image}
                                style={styles.profileImage}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={styles.inputBoxContainer}>
                            <CustomInput
                                initialValue={name}
                                onTypingComplete={setName}
                                placeholder='Name'
                                inputStyle={[styles.inputStyle, styles.nameInput]}
                                containerStyle={styles.inputContainer}
                            />
                            <TouchableOpacity style={styles.profession} onPress={() => setIsopen(true)}>
                                <Text style={styles.professionLabel}>{profession}</Text>
                                <Image source={icons.arrowdown} style={styles.down} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <CustomInput
                        initialValue={description}
                        onTypingComplete={setDescription}
                        placeholder='Description'
                        placeholderTextColor={colors.grey1}
                        multiline
                        maxLength={250}
                        textAlignVertical='top'
                        inputStyle={[styles.inputStyle, styles.multiline]}
                        containerStyle={[styles.inputContainer, styles.mt_20, descriptionBoxHeight]}
                    />

                    <CustomButton
                        label='Confirm Change'
                        containerStyle={styles.button}
                    />
                </View>
            </KeyboardAwareScrollView>
            {
                // isOpen &&
                <ProfessionModal
                    addMarginBottom
                    isOpen={isOpen}
                    toggleModal={() => setIsopen(false)}
                />
            }
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20
    },
    mt_20: {
        marginTop: 20
    },
    form: {
        padding: 20,
        backgroundColor: colors.black,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.27,
        height: SCREEN_WIDTH * 0.27,
        borderRadius: 7,
        borderColor: colors.white,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '95%',
        height: '95%',
        borderRadius: 1
    },
    inputBoxContainer: {
        paddingLeft: 8,
        flex: 1,
        justifyContent: 'space-around'
    },
    inputContainer: {
        borderColor: colors.white,
        borderWidth: 0.5,
        borderBottomColor: colors.white
    },
    nameInput: {
        paddingTop: 0,
    },
    inputStyle: {
        color: colors.white,
        paddingVertical: undefined,
        fontFamily: fonts.medium,
        fontSize: 14,
        includeFontPadding: false
    },
    multiline: {
        textAlignVertical: 'top',
        color: colors.grey7,
        fontSize: 10,
        includeFontPadding: false
    },
    profession: {
        height: 45,
        borderColor: colors.white,
        borderWidth: 0.5,
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    professionLabel: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.white,
        // lineHeight: 20
        includeFontPadding: false
    },
    down: {
        width: 20,
        height: 20
    },
    button: {
        backgroundColor: colors.blue1,
        marginTop: 20
    }
})