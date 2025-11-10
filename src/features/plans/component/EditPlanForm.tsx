import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useMemo, useState } from 'react'
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
import LocationSuggestionBox from '../../../shared/component/LocationSuggestionBox'
import { getLocalTimeBreakdown, toISODateTime } from '../../../shared/utils/dateTimeConversion'
import { showToast } from '../../../shared/utils/toast'
import { getMyPlans, updatePlan } from '../plansApi'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { useNavigation } from '@react-navigation/native'
import { clearCreatePlanLocation } from '../planSlice'

interface EditPlanFormInterface {
    data?: any
}

const EditPlanForm: FC<EditPlanFormInterface> = ({
    data = null
}) => {

    const today = new Date().toISOString().split("T")[0]
    const { createPlanLocation } = useAppSelector(state => state?.plan)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()

    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [selectedMonth, setSelectedMonth] = useState('')
    const [time, setTime] = useState('')
    const [timeUnit, setTimeUnit] = useState('am')
    const [title, setTitle] = useState('')
    const [planLocationName, setPlanLocationName] = useState('')
    const [planLocationId, setPlanLocationId] = useState('')
    const [desc, setDesc] = useState('')
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        setSelectedDate(data?.planAt.split("T")[0] ?? today)
        setSelectedMonth(moment(data?.planAt).format("MMMM, yyyy"))
        setTitle(data?.title)
        setDesc(data?.description)
        setPlanLocationName(data?.planLocation?.address?.formatted ?? data?.address ?? '')
        setPlanLocationId(data?.planLocation?.address?.placeId ?? '')
        const t = getLocalTimeBreakdown(data?.planAt)
        setTime(t?.hours + ":" + t?.minutes)
        setTimeUnit(t?.ampm)
    }, [data, today])

    useEffect(() => {
        if (createPlanLocation?.planLocId)
            setPlanLocationId(createPlanLocation?.planLocId)
    }, [createPlanLocation])


    const onDateChange = (date: any) => {
        setSelectedDate(date);
        setSelectedMonth(moment(date).format("MMMM, yyyy"))
    }

    const markedDate = useMemo(() => {
        if (!selectedDate) return {};
        return {
            [selectedDate]: {
                selected: true,
                selectedColor: colors.blue1,
                disableTouchEvent: true,
            },
        };
    }, [selectedDate]);

    const onUpdatePlan = () => {

        console.log(data);


        if (!title) { showToast('Please enter plan title!'); return; }
        if (!planLocationId) { showToast('Please select plan location!'); return; }
        if (!desc) { showToast('Please add description!'); return; }
        if (!time || !timeUnit) { showToast('Please select time!'); return; }

        const param = {
            title: title,
            description: desc,
            planLocation: planLocationId,
            planAt: toISODateTime(selectedDate, time + ' ' + timeUnit)
        }

        console.log(param);


        setLoader(true)

        updatePlan(param, data?._id).then(res => {

            if (res?.success) {
                showToast("Plan has been updated successfully!!!")
                navigation.goBack()
                dispatch(clearCreatePlanLocation())
                getMyPlans()
            } else {
                showToast(res?.message)
            }

        }).finally(() => setLoader(false))

    }

    if (!data) return null
    return (
        <CalendarProvider
            date={selectedDate}
            key={selectedDate}
            onDateChanged={onDateChange}
            showTodayButton={false}
            disableAutoDaySelection={[ExpandableCalendar.navigationTypes.MONTH_SCROLL, ExpandableCalendar.navigationTypes.MONTH_ARROWS, ExpandableCalendar.navigationTypes.WEEK_SCROLL, ExpandableCalendar.navigationTypes.TODAY_PRESS]}
        >
            <CalenderHeader
                heading={"Edit Plan"}
                selectedMonth={selectedMonth}
            />
            <ExpandedCalender
                markedDate={markedDate}
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.content} enableOnAndroid enableAutomaticScroll extraHeight={100} extraScrollHeight={150} keyboardShouldPersistTaps='handled'>

                <CustomInput
                    label='Title*'
                    value={title}
                    placeholder='Enter your trip title'
                    textAlignVertical='top'
                    maxLength={50}
                    onChangeText={setTitle}
                />

                <LocationSuggestionBox
                    locationType='plan'
                    textValue={planLocationName}
                    label='Where is this plan happening?*'
                    placeholder='Choose Location'
                    containerStyle={styles.mt_25}
                />

                <Text style={[styles.label, styles.mt_25]}>Describe the Plan*</Text>
                <View style={styles.describeBox}>
                    <CustomInput
                        value={desc}
                        multiline
                        numberOfLines={5}
                        placeholder='Share what’s happening.'
                        textAlignVertical='top'
                        maxLength={50}
                        inputStyle={styles.multilineInputStyle}
                        containerStyle={styles.inputContainerStyle}
                        onChangeText={setDesc}
                    />
                </View>

                <TimeSelection
                    timeData={data?.planAt}
                    onCompleteEditTime={setTime}
                    onSelectTimeUnit={setTimeUnit}
                />

                <CustomButton
                    label='Edit Plan'
                    containerStyle={styles.mt_60}
                    onPress={onUpdatePlan}
                    loading={loader}
                />

            </KeyboardAwareScrollView>

        </CalendarProvider>
    )
}

export default EditPlanForm

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 80
    },
    mt_25: {
        marginTop: 25
    },
    mt_60: {
        marginTop: 60
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
        fontSize: 16,
        color: colors.black
    },
    inputContainerStyle: {
        flex: 1,
        height: undefined,
        borderBottomWidth: 0,
        alignItems: undefined,
    },
})