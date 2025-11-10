import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { icons } from '../../../shared/constants/icons'
import { sendMessage } from '../../../shared/utils/firestoreMessageHelper'

interface MessageInputBarInterface {
    groupId?: string
}

const MessageInputBar: FC<MessageInputBarInterface> = ({
    groupId = ''
}) => {

    const [text, setText] = useState('hihihih')


    const onSend = useCallback(async () => {
        // console.log(groupId);

        const res = await sendMessage(groupId, text)

        if (res) {
            console.log('sent');

        }

    }, [groupId, text])

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    placeholder='Type here...'
                    style={styles.input}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={onSend}>
                    <Image source={icons.sendbutton} resizeMode='contain' style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageInputBar

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.black,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    inputContainer: {
        height: 50,
        width: '100%',
        borderRadius: 100,
        backgroundColor: colors.black3,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        height: 45,
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 15,
        fontFamily: fonts.regular,
        fontSize: 12,
        includeFontPadding: false,
        color: colors.white,
        marginHorizontal: 10
    },
    sendIcon: {
        width: 43,
        height: 43
    }
})