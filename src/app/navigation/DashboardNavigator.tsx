
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import GroupChat from '../../features/chat/screens/GroupChat'
import Location from '../../features/location/screens/Location'
import { useAppSelector } from '../../redux/store'
import ChooseLocation from '../../features/plans/screens/ChooseLocation'

const Stack = createNativeStackNavigator()

const DashboardNavigator = () => {

    const { coords } = useAppSelector(state => state?.location)
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {coords ? (
                // If we have coords, show main tabs
                <>
                    <Stack.Screen name="tabs" component={BottomTabNavigator} />
                    <Stack.Screen name="groupchat" component={GroupChat} />
                    <Stack.Screen name='chooselocation' component={ChooseLocation} />
                </>
            ) : (
                // Otherwise, show location screen
                <Stack.Screen name="location" component={Location} />
            )}
        </Stack.Navigator>
    )
}

export default DashboardNavigator