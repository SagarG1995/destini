import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, memo, useCallback, useRef } from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { ExpandableCalendar } from 'react-native-calendars'
import '../../../shared/constants/calenderConfig'
import { Positions } from 'react-native-calendars/src/expandableCalendar'
import { useSharedValue, withTiming } from 'react-native-reanimated'

interface ExpandedCalenderInterface {
    markedDate?: {}
}

const ExpandedCalender: FC<ExpandedCalenderInterface> = ({
    markedDate
}) => {

    const calendarRef = useRef<{ toggleCalendarPosition: () => boolean }>(null);
    const rotation = useSharedValue(0);


    const toggleCalendarExpansion = useCallback(() => {
        const isOpen = calendarRef.current?.toggleCalendarPosition();
        rotation.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
    }, [rotation]);

    const onCalendarToggled = useCallback(
        (isOpen: boolean) => {
            rotation.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
        },
        [rotation]
    );

    const renderHeader = useCallback(
        (date?: any) => {
            return (
                <TouchableOpacity style={styles.header} onPress={toggleCalendarExpansion}>
                    <Text style={styles.calenderHeading}>{date?.toString('MMMM yyyy')}</Text>
                </TouchableOpacity>
            );
        },
        [toggleCalendarExpansion]
    );


    return (

        <ExpandableCalendar
            ref={calendarRef}
            firstDay={0}
            removeClippedSubviews
            windowSize={2}
            renderHeader={renderHeader}
            onCalendarToggled={onCalendarToggled}
            initialPosition={Positions.CLOSED}
            animateScroll
            markedDates={markedDate}
            theme={{
                arrowColor: colors.white,
                textDayFontSize: 14,
                textDayFontFamily: fonts.bold,
                dayTextColor: colors.white,
                textMonthFontSize: 14,
                textMonthFontFamily: fonts.bold,
                monthTextColor: colors.white,
                backgroundColor: colors.black,
                calendarBackground: colors.black,
                textDisabledColor: colors.grey1,
                selectedDayBackgroundColor: colors.blue1,
            }}
        />
    )
}

export default memo(ExpandedCalender)

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    calenderHeading: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.white
    },
})