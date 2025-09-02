import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { icons } from '../../../shared/constants/icons'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'

interface HeaderInterface {
    showSearchBox?: boolean
}

const Header: FC<HeaderInterface> = ({
    showSearchBox = true
}) => {

    const insets = useSafeAreaInsets()

    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top + 20 }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            {
                showSearchBox &&
                <View style={[styles.row]}>
                    <View style={styles.searchBox}>
                        <TextInput
                            value=''
                            placeholder='Search Smart. Connect Better.'
                            style={styles.input}
                            placeholderTextColor={colors.grey3}
                        />
                        <TouchableOpacity >
                            <Image
                                source={icons.searchbtncircle}
                                style={styles.search}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.ml_10}>
                        <Image
                            source={icons.filterbtncircle}
                            style={styles.search}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        // backgroundColor: 'red'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mt_20: {
        marginTop: 20,
    },
    ml_10: {
        marginLeft: 10
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.grey6,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 15,
        color: colors.black,
        fontFamily: fonts.medium,
        fontSize: 12,
        includeFontPadding: false,
    },
    search: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'red',
        overflow: 'hidden',
    }
})