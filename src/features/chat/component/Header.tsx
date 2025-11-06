import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '../../../shared/constants/icons';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';
import RootHeader from '../../../shared/component/RootHeader';

interface HeaderInterface {

}

const Header: FC<HeaderInterface> = ({

}) => {


    return (
        <RootHeader>
            <View style={[styles.container,]}>
                <Image source={icons.chat} resizeMode='contain' style={styles.icon} tintColor={colors.black} />
                <Text style={styles.heading}>Chats</Text>
            </View>
        </RootHeader>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
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