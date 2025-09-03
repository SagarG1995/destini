import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { FC, memo, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { icons } from '../../../shared/constants/icons'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { useNavigation } from '@react-navigation/native'

interface HeaderInterface {
    showSearchBox?: boolean,
    showPlanCounter?: number
}

const Header: FC<HeaderInterface> = ({
    showSearchBox = true,
    showPlanCounter = 0
}) => {

    const insets = useSafeAreaInsets()
    const navigation = useNavigation<any>()

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
            {
                (typeof showPlanCounter === 'number' && showPlanCounter !== 0) &&
                <View style={[styles.row, styles.justifyBtw]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={icons.arrowback} style={styles.backIcon} resizeMode='contain' />
                        <Image source={icons.calenderheart} style={styles.calenderIcon} resizeMode='contain' tintColor={colors.black} />
                        <Text style={styles.label}>My plans</Text>
                    </TouchableOpacity>

                    <View style={styles.counterContainer}>
                        <Text style={styles.counterText}>Total Plans</Text>
                        <View style={styles.counterBox}>
                            <Text style={styles.counter}>10</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    justifyBtw: {
        justifyContent: 'space-between'
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
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 20
    },
    calenderIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    label: {
        fontFamily: fonts.medium,
        fontSize: 16,
        color: colors.black,
        marginLeft: 10,
        includeFontPadding: false
    },
    counterContainer: {
        height: 40,
        backgroundColor: colors.black,
        paddingRight: 5,
        paddingLeft: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterText: {
        fontFamily: fonts.medium,
        fontSize: 14,
        color: colors.white,
        includeFontPadding: false
    },
    counterBox: {
        backgroundColor: colors.white,
        marginLeft: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    counter: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.blue1,
        includeFontPadding: false
    }
})