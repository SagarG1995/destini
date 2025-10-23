import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../../../shared/constants/colors'
import CacheImage from '../../../shared/component/CacheImage'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import { fonts } from '../../../shared/constants/fonts'
import { icons } from '../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../../redux/store'
import { images } from '../../../shared/constants/images'

interface ProfileCardInterface {

}

const ProfileCard: FC<ProfileCardInterface> = () => {

    const { userdata } = useAppSelector(state => state?.profile)
    const navigation = useNavigation<any>()
    // console.log(userdata);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <CacheImage
                    uri={userdata?.image}
                    style={styles.profileImage}
                    resizeMode='cover'
                    fallbackComponent={<Image source={userdata?.gender === 'male' ? images.boy : images.girl} style={styles.profileImage} resizeMode='contain' />}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.personalDetails}>
                    <Text style={styles.name} numberOfLines={1} allowFontScaling={false}>{userdata?.full_name}</Text>
                    <Text style={styles.prof} numberOfLines={1} allowFontScaling={false}>{userdata?.professions}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text
                        style={styles.description}
                        allowFontScaling={false}
                        numberOfLines={Math.floor((SCREEN_WIDTH * 0.21) / 14)}
                    >
                        {userdata?.description}
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
        marginTop: 10
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