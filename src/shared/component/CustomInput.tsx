import { View, Text, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle, TextInput } from 'react-native'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

interface CustomInputInterface extends TextInputProps {
    initialValue?: any,
    leftIcon?: () => React.ReactElement | null;
    rightIcon?: () => React.ReactElement | null;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: TextStyle;
    onTypingComplete?: (text: string) => void;
    onChangeText?: (text: string) => void;
}

const CustomInput: FC<CustomInputInterface> = ({
    initialValue,
    leftIcon,
    rightIcon,
    inputStyle,
    containerStyle,
    onChangeText,
    onTypingComplete,
    ...rest
}) => {

    const isControlled = rest?.value !== undefined;
    const [text, setText] = useState(initialValue);
    const inputValue = isControlled ? rest?.value : text;


    useEffect(() => {
        if (!isControlled) {
            setText(initialValue);
        }
    }, [initialValue, isControlled]);

    const handleEndEditing = useCallback(() => {
        onTypingComplete?.(inputValue ?? '');
    }, [inputValue, onTypingComplete]);

    const handleTextChange = useCallback((value: string) => {
        if (isControlled) {
            onChangeText?.(value);
        } else {
            setText(value);
        }
    }, [isControlled, onChangeText]);


    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                {...rest}
                value={inputValue}
                style={[styles.input, inputStyle]}
                placeholderTextColor={rest?.placeholderTextColor || colors.black}
                onChangeText={handleTextChange}
                onEndEditing={handleEndEditing}
            />
            {
                rightIcon &&
                rightIcon()
            }
        </View>
    )
}

export default memo(CustomInput)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 45,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        alignItems: 'flex-end',
        borderRadius: 10,
        overflow: 'hidden'
    },
    input: {
        flex: 1,
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.regular,
        paddingVertical: 0,
        paddingTop: 10,
        textAlignVertical: 'center',
        paddingLeft: 10,
    }
})