import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../../shared/constants/icons';
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../../auth/authSlice';
import { useNavigation } from '@react-navigation/native';

interface HeaderInterface {
    isEditing?: boolean
}

const Header: FC<HeaderInterface> = ({
    isEditing = false
}) => {

    const insets = useSafeAreaInsets();
    const dispatch = useDispatch()
    const navigation = useNavigation<any>()


    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top }
    }, [insets])

    const logout = () => {
        dispatch(clearAuth())
    }

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <View style={styles.row} >
                {
                    isEditing &&
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Image source={icons.arrowback} style={styles.back} resizeMode='contain' />
                    </TouchableOpacity>
                }
                <Image source={icons.profile} style={styles.profile} resizeMode='contain' tintColor={colors.black} />
                <Text style={styles.heading}>{isEditing ? 'Edit Profile' : 'Profile Section'}</Text>
            </View>
            {
                !isEditing &&
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Image source={icons.logout} style={styles.logout} resizeMode='contain' />
                </TouchableOpacity>
            }
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
        height: 100,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        width: 30,
        height: 30,
    },
    profile: {
        width: 30,
        height: 30,
    },
    heading: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.black,
        marginLeft: 5,
        includeFontPadding: false,
    },
    logout: {
        width: 20,
        height: 20
    },
    button: {
        padding: 8,
    }

})