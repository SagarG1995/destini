/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Platform, Alert, AppState } from 'react-native';
import GetLocation from 'react-native-get-location';
import DeviceInfo from 'react-native-device-info';
import {
    check,
    request,
    openSettings,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';

export const useUserLocation = () => {

    const appStateRef = useRef(AppState.currentState);

    const [location, setLocation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLocationEnabled, setIsLocationEnabled] = useState<boolean>(true);


    const locationPermission =
        Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    // ---- Request Location Permission ----
    const requestPermission = async () => {
        try {
            const result = await request(locationPermission);

            if (result === RESULTS.GRANTED) {
                getCurrentLocation();
            } else if (result === RESULTS.BLOCKED) {
                Alert.alert(
                    'Permission Required',
                    'Please enable location permission in settings.',
                    [
                        { text: 'Open Settings', onPress: () => openSettings() },
                        { text: 'Cancel', style: 'cancel' },
                    ]
                );
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.warn('Permission error:', error);
            setLoading(false);
        }
    };

    // ---- Get Current Location ----
    const getCurrentLocation = async () => {
        try {
            // Android: ensure GPS enabled
            if (Platform.OS === 'android') {
                const enabled = await DeviceInfo.isLocationEnabled();
                if (!enabled) {
                    console.log('GPS is OFF, waiting...');
                    return;
                }
            }

            const loc = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            });
            setLocation(loc);
            setLoading(false);
        } catch (error: any) {
            const { code } = error;
            console.warn('Location error:', code, error.message);

            if (code === 'UNAVAILABLE') {
                setIsLocationEnabled(false);
            }
            setLoading(false);
        }
    };

    // ---- Check Permission and Location ----
    const checkAndRequestLocation = async () => {
        const result = await check(locationPermission);
        if (result === RESULTS.GRANTED) {
            getCurrentLocation();
        } else {
            requestPermission();
        }
    };

    // ---- Detect when app returns from background ----
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextState => {
            if (appStateRef.current.match(/inactive|background/) && nextState === 'active') {
                checkAndRequestLocation();
            }
            appStateRef.current = nextState;
        });
        return () => subscription.remove();
    }, []);

    // ---- Poll for GPS status changes while foregrounded ----
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (appStateRef.current === 'active') {
            interval = setInterval(async () => {
                const enabled = await DeviceInfo.isLocationEnabled();
                if (enabled && !isLocationEnabled) {
                    console.log('GPS just turned ON → refreshing location...');
                    setIsLocationEnabled(true);
                    checkAndRequestLocation();
                } else if (!enabled && isLocationEnabled) {
                    console.log('GPS just turned OFF.');
                    setIsLocationEnabled(false);
                }
            }, 3000); // check every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isLocationEnabled]);

    // ---- Initial Check ----
    useEffect(() => {
        checkAndRequestLocation();
    }, []);

    return { location, locationLoading: loading, refresh: checkAndRequestLocation, isLocationEnabled };
};
