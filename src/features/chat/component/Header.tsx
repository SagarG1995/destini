import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../../shared/constants/icons';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';

interface HeaderInterface {

}

const Header: FC<HeaderInterface> = ({

}) => {

    const insets = useSafeAreaInsets();


    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <Image source={icons.chat} resizeMode='contain' style={styles.icon} tintColor={colors.black} />
            <Text style={styles.heading}>Chats</Text>
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
    },
    icon: {
        width: 20,
        height: 20
    },
    heading: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.black,
        marginLeft: 10,
        includeFontPadding: false
    }
})