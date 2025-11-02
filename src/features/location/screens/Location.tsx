/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../../shared/constants/colors'
import { icons } from '../../../shared/constants/icons'
import { fonts } from '../../../shared/constants/fonts'
import CustomButton from '../../../shared/component/CustomButton'
import { useUserLocation } from '../../../shared/hooks/useUserLocation'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setCoords } from '../locationSlice'

const Location = () => {


    const { isLocationEnabled, location, checkAndRequestLocation, checkLocationPermission } = useUserLocation()
    const dispatch = useAppDispatch()
    const { coords, locationGranted } = useAppSelector(state => state?.location)


    useEffect(() => {
        (async () => {
            await checkLocationPermission()
        })()
    }, [checkLocationPermission, isLocationEnabled])

    const onPressAllow = async () => {
        if (!locationGranted) {
            checkAndRequestLocation()
        }
    }

    useEffect(() => {
        if (location) {
            dispatch(setCoords(location))
        }
    }, [location])

    return (
        <View style={styles.container}>
            <Image
                source={icons.locationblack}
                style={styles.icon}
                resizeMode='contain'
            />
            <Text style={styles.heading}>
                {
                    (locationGranted && !isLocationEnabled) ?
                        'Please turn on GPS'
                        :
                        !locationGranted ?
                            'Allow your location'
                            :
                            (locationGranted && isLocationEnabled && coords) &&
                            'Fetching your location...'

                }
            </Text>
            {
                !locationGranted &&
                <Text style={styles.subHeading}>
                    We need your location to give you better permission
                </Text>
            }

            {
                (locationGranted && !isLocationEnabled) ?
                    <>
                        <ActivityIndicator animating color={colors.black} style={styles.mt_20} />
                        <Text style={styles.label}>waiting...</Text>
                    </>
                    :
                    !locationGranted &&
                    <CustomButton
                        label={'Allow'}
                        containerStyle={styles.button}
                        onPress={onPressAllow}
                    />
            }
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mt_20: {
        marginTop: 20
    },
    icon: {
        width: 50,
        height: 50
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 17,
        includeFontPadding: false,
        color: colors.black,
        marginTop: 15
    },
    subHeading: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.black,
        includeFontPadding: false,
        marginTop: 10
    },
    label: {
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.black,
        marginTop: 6
    },
    button: {
        width: '50%',
        marginTop: 20
    }
})