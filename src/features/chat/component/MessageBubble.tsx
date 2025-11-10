import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';
import moment from 'moment';

interface MessageBubbleInterface {
    props?: any
}

const MessageBubble: FC<MessageBubbleInterface> = ({
    ...props
}) => {

    const [isMessageOwner, setIsMessageOwner] = useState(false)

    const currentMessage = props?.currentMessage

    useEffect(() => {
        if (props?.user?._id === currentMessage?.user?._id) {
            setIsMessageOwner(true)
        } else {
            setIsMessageOwner(false)
        }
    }, [currentMessage?.user?._id, props])

    const bubbleBg = useMemo(() => {
        if (isMessageOwner) {
            return styles.blackBubble
        } else {
            return null
        }
    }, [isMessageOwner])

    // console.log(isMessageOwner);


    return (
        <View style={[styles.container]}>

            <View style={styles.wrapper}>
                {
                    isMessageOwner &&
                    <Text style={[styles.time, styles.mr_10]}>
                        {
                            moment(currentMessage?.createdAt).format("hh:mm a")
                        }
                    </Text>
                }
                <View style={[styles.bubble, bubbleBg]}>
                    <Text style={styles.message}>{currentMessage?.text}</Text>
                </View>
            </View>
        </View>
    )
}

export default MessageBubble

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        marginVertical: 4,
    },
    mr_10: {
        marginRight: 10
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    bubble: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.blue1,
        borderRadius: 40,
    },
    blackBubble: {
        backgroundColor: colors.black
    },
    message: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.white,
        includeFontPadding: false
    },
    time: {
        fontFamily: fonts.medium,
        fontSize: 13,
        color: colors.black2,
        includeFontPadding: false
    }
})