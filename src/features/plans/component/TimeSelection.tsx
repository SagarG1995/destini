import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, memo, useState } from 'react'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import CustomInput from '../../../shared/component/CustomInput'

interface TimeSelectionInterface {
    onCompleteEditTime?: (time: string) => void;
    onSelectTimeUnit?: (unit: string) => void
}

const TimeSelection: FC<TimeSelectionInterface> = ({
    onCompleteEditTime,
    onSelectTimeUnit
}) => {

    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [unit, setUnit] = useState('am')


    const handleComplete = () => {

        let _hours = parseInt(hours || '0', 10);
        let _minutes = parseInt(minutes || '0', 10);

        // Validate hours (1–12)
        if (isNaN(_hours) || _hours < 1) _hours = 1;
        if (_hours > 12) {
            _hours = 12;
            setHours('12')
        }

        // Validate minutes (0–59)
        if (isNaN(_minutes) || _minutes < 0) _minutes = 0;
        if (_minutes > 59) {
            _minutes = 59;
            setMinutes('59')
        }

        // Format with leading zeros
        const formattedTime = `${_hours.toString().padStart(2, '0')}:${_minutes
            .toString()
            .padStart(2, '0')}`;


        // const formattedTime = `${hours || '00'}:${minutes || '00'}`;
        onCompleteEditTime?.(formattedTime);

    };

    const onUnitSelection = (_unit: string) => {
        setUnit((_prev: string) => _unit)
        onSelectTimeUnit?.(_unit)
    }

    const onChangeHours = (val: string) => {
        // Allow only numbers and max 2 digits
        const clean = val.replace(/[^0-9]/g, '').slice(0, 2);
        setHours(clean);
    };

    const onChangeMinutes = (val: string) => {
        const clean = val.replace(/[^0-9]/g, '').slice(0, 2);
        setMinutes(clean);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Time</Text>
            <View style={styles.content}>
                <View style={styles.row}>
                    <CustomInput
                        value={hours}
                        placeholder='00'
                        multiline
                        numberOfLines={1}
                        maxLength={2}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        keyboardType='number-pad'
                        textAlignVertical='center'
                        onChangeText={onChangeHours}
                        onTypingComplete={handleComplete}
                    />
                    <Text style={styles.dot}>:</Text>
                    <CustomInput
                        value={minutes}
                        placeholder='00'
                        multiline
                        numberOfLines={1}
                        maxLength={2}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                        keyboardType='number-pad'
                        textAlignVertical='center'
                        onChangeText={onChangeMinutes}
                        onTypingComplete={handleComplete}
                    />
                </View>

                <View style={styles.unitContainer}>
                    <TouchableOpacity style={[styles.unitButton, (unit === 'am') && styles.activeUnit]} onPress={() => onUnitSelection?.('am')}>
                        <Text style={styles.unit}>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.unitButton, (unit === 'pm') && styles.activeUnit]} onPress={() => onUnitSelection?.('pm')}>
                        <Text style={styles.unit}>PM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default memo(TimeSelection)

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black
    },
    content: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: 0,
        paddingTop: 0,
        includeFontPadding: false
    },
    inputContainerStyle: {
        width: 50,
        borderColor: colors.grey5,
        borderWidth: 0.9,
    },
    dot: {
        fontFamily: fonts.bold,
        fontSize: 18,
        marginHorizontal: 5,
        color: colors.black
    },
    unitContainer: {
        padding: 5,
        backgroundColor: colors.black,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8
    },
    unitButton: {
        width: 40,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        borderRadius: 5
    },
    activeUnit: {
        backgroundColor: colors.blue1
    },
    unit: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white
    }
})