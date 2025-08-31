import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { memo, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CacheImage from '../../../shared/component/CacheImage';
import { icons } from '../../../shared/constants/icons';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';

const Header = () => {

    const navigation = useNavigation<any>()
    const insets = useSafeAreaInsets();


    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top + 20 }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <View style={[styles.header]}>
                <CacheImage
                    uri='https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                    style={styles.image}
                    resizeMode='cover'
                />
                <View style={styles.row}>
                    <Image source={icons.distance} style={styles.location} resizeMode='contain' />
                    <Text style={styles.locationLabel}>California, USA</Text>
                </View>
            </View>
            <View style={[styles.mt_20, styles.row]}>
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
        </View>
    )
}

export default memo(Header)


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    image: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    },
    location: {
        width: 20,
        height: 20
    },
    locationLabel: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.transparentBlack1,
        includeFontPadding: false,
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
        // backgroundColor: 'red'
    },
    search: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'red',
        overflow: 'hidden',
    }
})