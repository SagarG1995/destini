import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../../../shared/constants/colors'
import CacheImage from '../../../shared/component/CacheImage'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import { fonts } from '../../../shared/constants/fonts'
import { icons } from '../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'

interface ProfileCardInterface {

}

const ProfileCard: FC<ProfileCardInterface> = () => {

    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <CacheImage
                    uri='https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                    style={styles.profileImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.details}>
                <View style={styles.personalDetails}>
                    <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>ELLIOT RAWAT</Text>
                    <Text style={styles.prof} numberOfLines={1} allowFontScaling={false}>SECURITY ANALYST </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text
                        style={styles.description}
                        allowFontScaling={false}
                        numberOfLines={Math.floor((SCREEN_WIDTH * 0.21) / 14)}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editprofile')}>
                <Image source={icons.edit} resizeMode='contain' style={styles.edit} />
            </TouchableOpacity>
        </View>
    )
}

export default memo(ProfileCard)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 15
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
    details: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between'
    },
    personalDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        maxWidth: "60%",
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.blue1,
        includeFontPadding: false,
    },
    prof: {
        maxWidth: "40%",
        flexShrink: 1,
        fontFamily: fonts.medium,
        fontSize: 8,
        color: colors.white,
        marginLeft: 10,
        includeFontPadding: false,
    },
    descriptionContainer: {
        maxHeight: SCREEN_WIDTH * 0.21, // same as imageContainer height
        overflow: 'hidden',
    },
    description: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.white,
        includeFontPadding: false,
    },
    editButton: {
        padding: 5,
        position: 'absolute',
        bottom: -20,
        right: -15
    },
    edit: {
        width: 35,
        height: 35
    }
})