/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { icons } from '../../../shared/constants/icons'
import RootHeader from '../../../shared/component/RootHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions'

interface HeaderInterface {
    heading?: string;
    highlightText?: string;
    showBack?: boolean,
    headingStyle?: StyleProp<TextStyle>;
    subHeadingComponent?: () => React.JSX.Element,
}

const Header: FC<HeaderInterface> = ({
    heading = '',
    showBack = true,
    highlightText = '',
    headingStyle,
    subHeadingComponent
}) => {

    const navigation = useNavigation<any>()

    return (
        <View style={[styles.container, !showBack && styles.padd_H_20]}>
            {
                showBack &&
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} disabled={!showBack}>
                    <Image source={icons.arrowback} style={styles.backIcon} resizeMode='contain' />
                </TouchableOpacity>
            }
            <View style={styles.flex1}>
                {
                    (heading !== '') &&
                    <Text style={[styles.heading, headingStyle]} numberOfLines={1} adjustsFontSizeToFit allowFontScaling={false}>
                        {heading}
                    </Text>
                }
                <View style={[styles.row, styles.mt_5]}>
                    {
                        (highlightText !== '') &&
                        <View style={styles.highlight}>
                            <Text style={styles.highlightText} numberOfLines={1} adjustsFontSizeToFit allowFontScaling={false}>
                                {highlightText}
                            </Text>
                        </View>
                    }

                    {
                        subHeadingComponent &&
                        <View style={[styles.subheadingContainer, !showBack && { marginLeft: 0 }]}>
                            {
                                subHeadingComponent?.()
                            }
                        </View>
                    }
                </View>
            </View>

        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    flex1: {
        flex: 1
    },
    padd_H_20: {
        paddingHorizontal: 20
    },
    mt_5: {
        marginTop: 5
    },
    row: {
        flexDirection: 'row',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subheadingContainer: {
        flex: 1,
        justifyContent: 'center',
        flexShrink: 1,
        marginLeft: 8
    },
    backIcon: {
        width: '70%',
        height: '70%',
    },
    heading: {
        maxWidth: '90%',
        fontFamily: fonts.semibold,
        fontSize: 24,
        color: colors.black,
        includeFontPadding: false,
        textAlign: 'center',
        // backgroundColor: 'red'
    },
    highlight: {
        height: 46,
        backgroundColor: colors.black,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    highlightText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 24,
        includeFontPadding: false
    }
})