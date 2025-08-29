import { View, Text, Keyboard, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React, { FC, memo, useRef } from 'react'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { OtpInput } from 'react-native-otp-entry'

interface CustomOtpInputInterface {
    onFillOTP?: (otp: string) => void,
    containerStyle?: StyleProp<ViewStyle>
}

const CustomOtpInput: FC<CustomOtpInputInterface> = ({
    onFillOTP,
    containerStyle
}) => {
    const _ref = useRef<any>(null)

    return (
        <View style={[styles.container, containerStyle]}>
            <OtpInput
                ref={_ref}
                numberOfDigits={6}
                placeholder='*'
                focusColor={colors.black}
                onFilled={(text) => {
                    Keyboard.dismiss()
                    onFillOTP &&
                        onFillOTP(text)
                }}
                theme={{
                    pinCodeTextStyle: {
                        fontFamily: fonts.regular,
                        fontSize: 16,
                        color: colors.black,
                    },
                    pinCodeContainerStyle: {
                        width: 50,
                        height: 50,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0,
                        borderBottomColor: colors.black,
                        borderBottomWidth: 2,
                    },
                }}
            />

        </View>
    )
}

export default memo(CustomOtpInput)

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
})