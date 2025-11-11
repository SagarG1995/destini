import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC, memo } from 'react'
import { colors } from '../../../shared/constants/colors';
import AppStatusBar from '../../../shared/component/AppStatusBar';
import { icons } from '../../../shared/constants/icons';
import { fonts } from '../../../shared/constants/fonts';
import ChatHeaderDropDownMenu from './ChatHeaderDropDownMenu';
import RootHeader from '../../../shared/component/RootHeader';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

interface ChatHeaderInterface {
    data?: any
}

const ChatHeader: FC<ChatHeaderInterface> = ({
    data = null
}) => {

    const navigation = useNavigation<any>()

    return (
        <RootHeader additionalPaddingTop={0} containerStyle={{ backgroundColor: colors.black }}>
            <View style={[styles.container]}>
                <AppStatusBar backgroundColor={colors.black} barStyle='light-content' />
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Image source={icons.arrowback} style={styles.backIcon} resizeMode='contain' tintColor={colors.white} />
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.label} numberOfLines={1}>{data?.title ?? data?.planTitle}</Text>
                            {/* <Image source={icons.arrowsmright} style={styles.arrwIcon} resizeMode='contain' tintColor={colors.white} />
                            <Text style={styles.label}>Delhi</Text> */}
                        </View>
                        <View style={[styles.row, styles.mt_5]}>
                            <Image source={icons.calendar} resizeMode='contain' style={styles.calenderIcon} />
                            <Text style={styles.date}>
                                {
                                    moment(data?.date ?? data?.planAt).format("MMM, DD YYYY")
                                }
                            </Text>
                        </View>
                    </View>
                    <ChatHeaderDropDownMenu data={data} />
                </View>
            </View>
        </RootHeader>
    )
}

export default memo(ChatHeader)

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: colors.black,
    },

    row: {
        flexDirection: 'row',
    },
    mt_5: {
        marginTop: 5
    },
    button: {
        justifyContent: 'center',
        alignItems: "center",
        width: 50,
        height: 50,
        overflow: 'hidden',
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 16,
        color: colors.white,
        includeFontPadding: false
    },
    arrwIcon: {
        width: 19,
        height: 19,
        marginHorizontal: 10
    },
    calenderIcon: {
        width: 15,
        height: 15
    },
    date: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.white,
        marginLeft: 7,
        includeFontPadding: false
    },

})