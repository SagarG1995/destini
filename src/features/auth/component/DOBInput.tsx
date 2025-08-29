import React, { FC, memo, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../../shared/constants/colors";
import { fonts } from "../../../shared/constants/fonts";

interface DOBInputInterface {
    onChangeDOB?: (dob: { day: string; month: string; year: string; fullDate: string }) => void;
}

const DOBInput: FC<DOBInputInterface> = ({
    onChangeDOB
}) => {

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const dayRef = useRef<TextInput>(null);
    const monthRef = useRef<TextInput>(null);
    const yearRef = useRef<TextInput>(null);

    useEffect(() => {
        const fullDate =
            day.length === 2 && month.length === 2 && year.length === 4
                ? `${year}-${month}-${day}` // standard YYYY-MM-DD format
                : null;

        onChangeDOB?.({ day, month, year, fullDate });
    }, [day, month, year]);

    const handleDayChange = (text: string) => {
        if (text.length <= 2) {
            // going forward
            if (text.length === 2) {
                monthRef.current?.focus();
            }
            setDay(text);
        }
    };

    const handleMonthChange = (text: string) => {
        if (text.length <= 2) {
            // going back
            if (text.length === 0) {
                dayRef.current?.focus();
            }
            // going forward
            if (text.length === 2) {
                yearRef.current?.focus();
            }
            setMonth(text);
        }
    };

    const handleYearChange = (text: string) => {
        if (text.length <= 4) {
            // going back
            if (text.length === 0) {
                monthRef.current?.focus();
            }
            setYear(text);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                ref={dayRef}
                style={styles.input}
                keyboardType="number-pad"
                multiline
                maxLength={2}
                value={day}
                onChangeText={handleDayChange}
                placeholder="DD"
                placeholderTextColor={colors.black}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
                ref={monthRef}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={2}
                multiline
                value={month}
                onChangeText={handleMonthChange}
                placeholder="MM"
                placeholderTextColor={colors.black}
            />
            <Text style={styles.separator}>/</Text>
            <TextInput
                ref={yearRef}
                style={[styles.input, { flex: 1 }]}
                keyboardType="number-pad"
                maxLength={4}
                multiline
                value={year}
                onChangeText={handleYearChange}
                placeholder="YYYY"
                placeholderTextColor={colors.black}
            />
        </View>
    );
};

export default memo(DOBInput);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 50,
    },
    input: {
        flex: 0.2,
        fontSize: 16,
        padding: 8,
        textAlign: "center",
        borderRadius: 10,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
    },
    separator: {
        fontWeight: "600",
        marginHorizontal: 4,
        fontFamily: fonts.medium,
        fontSize: 16
    },
});


