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
    headingStyle?: StyleProp<TextStyle>;
    subHeadingComponent?: () => React.JSX.Element
}

const Header: FC<HeaderInterface> = ({
    heading,
    highlightText,
    headingStyle,
    subHeadingComponent
}) => {

    const navigation = useNavigation<any>()
    const insets = useSafeAreaInsets();


    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top + 20 }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={icons.arrowback} style={styles.backIcon} resizeMode='contain' />
                </TouchableOpacity>
                {
                    heading &&
                    <Text style={[styles.heading, headingStyle]} numberOfLines={1} adjustsFontSizeToFit allowFontScaling={false}>
                        {heading}
                    </Text>
                }
            </View>
            <View style={[styles.subheadingContainer, styles.row]}>
                {
                    highlightText &&
                    <View style={styles.highlight}>
                        <Text style={styles.highlightText} numberOfLines={1} adjustsFontSizeToFit allowFontScaling={false}>
                            {highlightText}
                        </Text>
                    </View>
                }
                {
                    subHeadingComponent &&
                    subHeadingComponent()
                }
            </View>
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {

    },
    row: {
        flexDirection: 'row',
    },
    backButton: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        marginTop: -4
    },
    subheadingContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    backIcon: {
        width: 25,
        height: 25
    },
    heading: {
        width: '80%',
        fontFamily: fonts.semibold,
        fontSize: 24,
        color: colors.black,
        textAlign: 'center',
    },
    highlight: {
        maxHeight: 46,
        backgroundColor: colors.black,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    highlightText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 24
    }
})