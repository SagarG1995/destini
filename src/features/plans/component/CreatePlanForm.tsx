import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import CalenderHeader from './CalenderHeader'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomInput from '../../../shared/component/CustomInput'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import TimeSelection from './TimeSelection'
import ExpandedCalender from './ExpandedCalender'
import CustomButton from '../../../shared/component/CustomButton'
import LocationSuggestion from '../../../shared/component/LocationSuggestion'
import { toISODateTime } from '../../../shared/utils/dateTimeConversion'
import { showToast } from '../../../shared/utils/toast'
import { createPlan } from '../plansApi'

const CreatePlanForm = () => {

    const today = new Date().toISOString().split("T")[0]
    const [selectedDate, setSelectedDate] = useState<any>(today);
    const [selectedMonth, setSelectedMonth] = useState('')
    const [time, setTime] = useState('')
    const [timeUnit, setTimeUnit] = useState('am')
    const [currentLocation, setCurrentLocation] = useState('')
    const [planLocation, setPlanLocation] = useState('')
    const [desc, setDesc] = useState('')
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        setSelectedMonth(moment(new Date()).format("MMMM, yyyy"))
    }, [])


    const onDateChange = (date: any) => {
        console.log(date);

        setSelectedDate(date);
        setSelectedMonth(moment(date).format("MMMM, yyyy"))
    }

    const markedDate = useMemo(() => {
        if (!selectedDate) return {};
        return {
            [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
            },
        };
    }, [selectedDate]);

    const onCreatePlan = () => {

        if (!currentLocation) { showToast('Please select current location!'); return; }
        if (!planLocation) { showToast('Please select plan location!'); return; }
        if (!desc) { showToast('Please add description!'); return; }
        if (!time || !timeUnit) { showToast('Please select time!'); return; }

        const param = {
            title: desc,
            planLocation: planLocation,
            creatorCurrentLocation: currentLocation,
            planAt: toISODateTime(selectedDate, time + ' ' + timeUnit)
        }

        console.log(param);


        setLoader(true)

        createPlan(param).then(res => {
            console.log(res);

        }).finally(() => setLoader(false))

    }


    return (
        <CalendarProvider
            date={selectedDate || today}
            onDateChanged={onDateChange}
            disableAutoDaySelection={[ExpandableCalendar.navigationTypes.MONTH_SCROLL, ExpandableCalendar.navigationTypes.MONTH_ARROWS, ExpandableCalendar.navigationTypes.WEEK_SCROLL, ExpandableCalendar.navigationTypes.TODAY_PRESS]}
        >
            <CalenderHeader
                selectedMonth={selectedMonth}
            />
            <ExpandedCalender
                markedDate={markedDate}
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.content} enableOnAndroid enableAutomaticScroll extraHeight={100} extraScrollHeight={150} keyboardShouldPersistTaps='handled'>

                <LocationSuggestion
                    locationType='current'
                    label='Your Current Location*'
                    placeholder='Noble Enclave, Palam Vihar'
                />

                <LocationSuggestion
                    locationType='plan'
                    label='Where is this plan happening?*'
                    placeholder='Choose Location'
                    containerStyle={styles.mt_25}
                />

                <Text style={[styles.label, styles.mt_25]}>Describe the Plan*</Text>
                <View style={styles.describeBox}>
                    <CustomInput
                        multiline
                        numberOfLines={5}
                        placeholder='Share what’s happening.'
                        textAlignVertical='top'
                        maxLength={50}
                        inputStyle={styles.multilineInputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onTypingComplete={setDesc}
                    />
                </View>

                <TimeSelection
                    onCompleteEditTime={setTime}
                    onSelectTimeUnit={setTimeUnit}
                />

                <CustomButton
                    label='Create Plan'
                    containerStyle={styles.mt_25}
                    onPress={onCreatePlan}
                />

            </KeyboardAwareScrollView>

        </CalendarProvider>
    )
}

export default CreatePlanForm

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    mt_25: {
        marginTop: 25
    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black
    },
    describeBox: {
        height: 100,
        borderRadius: 10,
        borderColor: colors.grey5,
        borderWidth: 0.9,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        overflow: 'hidden',
        marginTop: 10
    },
    multilineInputStyle: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 14,
        color: colors.black
    },
    inputContainerStyle: {
        flex: 1,
        height: undefined,
        borderBottomWidth: 0,
        alignItems: undefined,
    },
})