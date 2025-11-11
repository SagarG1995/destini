import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { FC, memo } from 'react'
import { icons } from '../../../shared/constants/icons';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';
import RootHeader from '../../../shared/component/RootHeader';

interface HeaderInterface {
    isRefreshing?: boolean
}

const Header: FC<HeaderInterface> = ({
    isRefreshing = false
}) => {


    return (
        <RootHeader containerStyle={{}}>
            <View style={[styles.container]}>
                <Image source={icons.chat} resizeMode='contain' style={styles.icon} tintColor={colors.black} />
                <Text style={styles.heading}>Chats</Text>
                {
                    isRefreshing &&
                    <>
                        <ActivityIndicator animating color={colors.black} />
                        <Text style={styles.text}>Refreshing...</Text>
                    </>
                }
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
        paddingVertical: 10
    },
    icon: {
        width: 20,
        height: 20
    },
    heading: {
        flex: 1,
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.black,
        marginLeft: 10,
        lineHeight: 20,
        includeFontPadding: false
    },
    text: {
        fontFamily: fonts.regular,
        fontSize: 10,
        color: colors.black,
        includeFontPadding: false,
        marginLeft: 10
    }
})