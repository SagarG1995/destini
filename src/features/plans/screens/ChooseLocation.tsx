/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors } from '../../../shared/constants/colors'
import CustomInput from '../../../shared/component/CustomInput'
import { getPlaceSuggestion } from '../plansApi'
import { fonts } from '../../../shared/constants/fonts'
import { setCreatePlanLocation } from '../planSlice'
import Header from '../component/Header'

const ChooseLocation = () => {

    const dispatch = useAppDispatch()
    const { createPlanLocation } = useAppSelector(state => state?.plan)
    const { loc_type } = useRoute<any>()?.params
    const navigation = useNavigation<any>()

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<any[]>([])
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)


    const fetchPlaces = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([])
            return
        }
        try {
            setLoading(true)
            const res = await getPlaceSuggestion(query)
            if (res?.success) {
                if (res?.data?.data?.length) {
                    setSuggestions(res?.data?.data)
                }
            }
        } catch (err) {
            console.error('Error fetching places:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleTextChange = useCallback(
        (value: string) => {
            setText(value)
            if (debounceTimer) clearTimeout(debounceTimer)
            const timer = setTimeout(() => {
                fetchPlaces(value)
            }, 400) // 400ms debounce
            setDebounceTimer(timer)
        },
        [debounceTimer]
    )

    const handleSelect = useCallback((item: any) => {
        setText(item.label)
        // if (loc_type === 'current') {
        //     dispatch(setCreatePlanLocation(
        //         {
        //             ...createPlanLocation,
        //             currentLocation: item?.label,
        //             currentLocId: item?.id
        //         }
        //     ))
        // }
        if (loc_type === 'plan') {
            dispatch(setCreatePlanLocation(
                {
                    ...createPlanLocation,
                    planLocation: item?.label,
                    planLocId: item?.id
                }
            ))
        }
        Keyboard.dismiss()
        navigation.goBack()
    }, [createPlanLocation, loc_type])

    return (
        <View style={styles.container}>
            <Header
                showPlanCounter={false}
                showSearchBox={false}
                showHeading
                containerStyle={{ backgroundColor: colors.black, paddingBottom: 20 }}
            />
            <CustomInput
                autoFocus
                value={text}
                placeholder='Search Your Destination...'
                onChangeText={handleTextChange}
                containerStyle={styles.inputContainerStyle}
            />
            <ScrollView contentContainerStyle={styles.scrollview}>
                {
                    loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="small" color={colors.black} />
                        </View>
                    )
                        :
                        (suggestions?.length > 0) &&
                        suggestions?.map((item, index) =>
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                key={index}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.suggestionText}>{item?.label ?? ''}</Text>
                            </TouchableOpacity>
                        )
                }
            </ScrollView>
        </View>
    )
}

export default ChooseLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    inputContainerStyle: {
        marginHorizontal: 10,
        marginTop: 15
    },
    scrollview: {
        flexGrow: 1
    },
    loaderContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomColor: colors.grey1,
        borderBottomWidth: 1,
    },
    suggestionText: {
        color: colors.black,
        fontSize: 12,
        fontFamily: fonts.regular,
        includeFontPadding: false
    },
})