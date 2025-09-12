import { View, Text, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle, TextInput } from 'react-native'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

interface CustomInputInterface extends TextInputProps {
    initialValue?: any,
    rightIcon?: () => React.ReactElement | null;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    labelContainerStyle?: StyleProp<ViewStyle>;
    label?: string,
    onTypingComplete?: (text: string) => void;
    onChangeText?: (text: string) => void;
}

const CustomInput: FC<CustomInputInterface> = ({
    initialValue,
    rightIcon,
    label,
    inputStyle,
    containerStyle,
    labelContainerStyle,
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

    if (label) {
        return (
            <View style={[styles.labelContainer, labelContainerStyle]}>
                {
                    label &&
                    <Text style={styles.label}>{label}</Text>
                }
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
            </View>
        )
    }

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
    labelContainer: {
        // backgroundColor: 'pink'
    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black,
        includeFontPadding: false
    },
    container: {
        flexDirection: 'row',
        height: 45,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        alignItems: 'flex-end',
        borderRadius: 10,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        height: '100%',
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.regular,
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 10,
        includeFontPadding: false
    }
})