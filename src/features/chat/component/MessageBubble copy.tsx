import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import { colors } from '../../../shared/constants/colors';
import { fonts } from '../../../shared/constants/fonts';
import moment from 'moment';
import { SCREEN_WIDTH } from '../../../shared/constants/dimensions';
import { Bubble, IMessage } from 'react-native-gifted-chat';


interface BubbleProps<TMessage extends IMessage = IMessage> {
    currentMessage: TMessage;
    user?: {
        _id: string | number;
    };
    // ...other optional render props
}

const MessageBubble: FC<BubbleProps<IMessage>> = ({
    currentMessage,
    user,
    props
}) => {

    const [isMessageOwner, setIsMessageOwner] = useState(false)

    useEffect(() => {
        if (user?._id === currentMessage?.user?._id) {
            setIsMessageOwner(true)
        } else {
            setIsMessageOwner(false)
        }
    }, [currentMessage, user?._id])

    const bubbleBg = useMemo(() => {
        if (isMessageOwner) {
            return styles.blackBubble
        } else {
            return null
        }
    }, [isMessageOwner])


    const formattedTime = useMemo(
        () => moment(currentMessage.createdAt).format('hh:mm a'),
        [currentMessage.createdAt]
    );

    if (!currentMessage) return null

    return (
        <View
            style={[
                styles.container,
                isMessageOwner ? styles.ownerContainer : styles.receiverContainer,
            ]}
        >
            {!isMessageOwner && (
                <View style={styles.avatarContainer}>
                    <Image
                        source={
                            typeof currentMessage?.user?.avatar === 'function'
                                ? undefined
                                : typeof currentMessage?.user?.avatar === 'string'
                                    ? { uri: currentMessage.user.avatar }
                                    : currentMessage?.user?.avatar
                        }
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Text style={styles.username} numberOfLines={1}>
                        {currentMessage?.user?.name}
                    </Text>
                </View>
            )}

            <View
                style={[
                    styles.wrapper,
                    isMessageOwner ? styles.ownerWrapper : styles.receiverWrapper,
                ]}
            >
                {isMessageOwner && <Text style={[styles.time, styles.mr_10]}>{formattedTime}</Text>}

                <View style={[styles.bubble, bubbleBg]}>
                    <Text style={styles.message}>{currentMessage?.text}</Text>
                </View>

                {!isMessageOwner && <Text style={[styles.time, styles.ml_10]}>{formattedTime}</Text>}
            </View>
        </View>

    )
}

export default (MessageBubble)

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        maxWidth: SCREEN_WIDTH * 0.8,
    },

    // Aligns the entire message bubble block
    ownerContainer: {
        alignSelf: 'flex-end',
        paddingRight: 8,
    },
    receiverContainer: {
        alignSelf: 'flex-start',
        paddingLeft: 8,
    },

    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ownerWrapper: {
        // flexDirection: 'row-reverse',
    },
    receiverWrapper: {
        flexDirection: 'row',
    },

    bubble: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.blue1,
        borderRadius: 40,
    },
    blackBubble: {
        backgroundColor: colors.black,
    },
    message: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.white,
        includeFontPadding: false
    },
    time: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.black2,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        alignSelf: 'flex-start', // important fix
        paddingLeft: 8,
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    username: {
        fontFamily: fonts.medium,
        fontSize: 10,
        color: colors.grey1,
        marginLeft: 3,
        flexShrink: 1,
    },
    mr_10: { marginRight: 10 },
    ml_10: { marginLeft: 10 },
});
