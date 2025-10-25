/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    TextInput,
    FlatList,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator,
} from 'react-native'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { getPlaceSuggestion } from '../../features/plans/plansApi'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import env from '../../api/env'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '../../redux/store'

interface LocationSuggestionInterface {
    locationType?: 'current' | 'plan'
    containerStyle?: StyleProp<ViewStyle>
    label?: string
    placeholder?: string,
    value?: string
}

const LocationSuggestion: FC<LocationSuggestionInterface> = ({
    locationType = 'current',
    // value,
    label,
    placeholder,
    containerStyle,
}) => {

    const navigation = useNavigation<any>()
    const { createPlanLocation } = useAppSelector(state => state?.plan)

    const [value, setValue] = useState<string>('')


    useEffect(() => {
        if (locationType === 'current') {
            setValue(createPlanLocation?.currentLocation)
        } else if (locationType === 'plan') {
            setValue(createPlanLocation?.planLocation)
        }
    }, [locationType])

    // 🧠 Fetch Google Places API
    // const fetchPlaces = async (query: string) => {
    //     if (!query.trim()) {
    //         setSuggestions([])
    //         setShowSuggestions(false)
    //         return
    //     }
    //     try {
    //         setLoading(true)
    //         const res = await getPlaceSuggestion(query)
    //         // console.log(res);
    //         if (res?.success) {
    //             if (res?.data?.data?.length) {
    //                 setSuggestions(res?.data?.data)
    //                 setShowSuggestions(true)
    //             }
    //         }
    //     } catch (err) {
    //         console.error('Error fetching places:', err)
    //     } finally {
    //         setLoading(false)
    //     }
    // }



    const renderSuggestion = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelect(item)}
        >
            <Text style={styles.suggestionText}>{item.label}</Text>
        </TouchableOpacity>
    )

    const onRedirectToChooseLocation = useCallback(() => {
        navigation.navigate('chooselocation', { loc_type: locationType })
    }, [locationType])

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity style={styles.box} onPress={onRedirectToChooseLocation}>
                <Text style={styles.boxLabel}>{value || placeholder}</Text>
            </TouchableOpacity>

            {/* <View style={{ backgroundColor: 'red' }}>
                {inputField}

                {showSuggestions && (
                    <View style={styles.suggestionContainer}>
                        {loading ? (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="small" color={colors.black} />
                            </View>
                        ) : (
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item) => item.id}
                                renderItem={renderSuggestion}
                                nestedScrollEnabled
                                keyboardShouldPersistTaps='always'
                                style={{
                                    height: 250,
                                }}
                            />
                        )}
                    </View>
                )}
            </View> */}
        </View>
    )
}

export default memo(LocationSuggestion)

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black,
        includeFontPadding: false,
        marginBottom: 4,
    },
    box: {
        flexDirection: 'row',
        height: 45,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        paddingLeft: 10
    },
    boxLabel: {
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.regular,
        includeFontPadding: false
    },

})
