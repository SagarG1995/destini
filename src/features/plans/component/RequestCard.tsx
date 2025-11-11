import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, StyleProp, ActivityIndicator } from 'react-native'
import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import CacheImage from '../../../shared/component/CacheImage'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { images } from '../../../shared/constants/images'
import { icons } from '../../../shared/constants/icons'
import { acceptDeclineRequest } from '../plansApi'
import { showToast } from '../../../shared/utils/toast'
import { ACCEPTED, DECLINED, PENDING } from '../../../shared/constants/planStatus'
import { getAllChats } from '../../chat/chatApi'

interface RequestCardInterface {
    data?: any,
    containerStyle?: StyleProp<ViewStyle>
}

const RequestCard: FC<RequestCardInterface> = ({
    data = null,
    containerStyle
}) => {

    const [status, setStatus] = useState<string>(data?.status ?? PENDING)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setStatus(data?.status ?? PENDING)
    }, [data?.status])

    const statusBgColor = useMemo(() => {
        if (data?.status === ACCEPTED || status === ACCEPTED) {
            return { backgroundColor: colors.yellow1 }
        }
        if (data?.status === DECLINED || status === DECLINED) {
            return { backgroundColor: colors.red1 }
        }
    }, [data?.status, status])


    const onTrigger = (type: string) => {

        const newStatus = type === 'accept' ? ACCEPTED : DECLINED

        setLoader(true)
        acceptDeclineRequest(data?.requestId, type).then(res => {

            if (res?.success) {
                getAllChats()
                setStatus(newStatus)
            } else {

                setStatus(data?.status ?? PENDING)
                showToast('Something went wrong. Please try again.')
            }
        }).finally(() => setLoader(false))
    }

    if (!data) return null

    return (
        <View style={[styles.container, containerStyle]}>
            <CacheImage
                uri={''}
                style={styles.image}
                resizeMode='cover'
                fallbackComponent={
                    <Image
                        source={data?.gender === 'male' ? images.boy : images.girl}
                        style={styles.image}
                        resizeMode='cover'
                    />
                }
            />
            <Text style={styles.label} numberOfLines={1}>{data?.full_name} requested to join your plan.</Text>
            {
                (status === PENDING || loader) &&
                <View style={styles.actionContainer}>
                    {
                        loader ?
                            <ActivityIndicator animating color={colors.black} />
                            :
                            <>
                                <TouchableOpacity style={styles.button} onPress={() => onTrigger('accept')}>
                                    <Image source={icons.like} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onTrigger('decline')}>
                                    <Image source={icons.dislike} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                            </>
                    }

                </View>
            }
            {
                status !== PENDING &&
                <View style={[styles.statusContainer, statusBgColor]}>
                    <Text style={styles.status}>{status}</Text>
                </View>
            }
        </View>
    )
}

export default memo(RequestCard)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2
    },
    label: {
        flex: 1,
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.black,
        marginLeft: 10
    },
    button: {
        marginLeft: 10,
    },
    icon: {
        width: 30,
        height: 30
    },
    statusContainer: {
        backgroundColor: colors.red1,
        height: 16,
        paddingHorizontal: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    status: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: colors.white,
        textTransform: 'uppercase',
        includeFontPadding: false,
    },
})