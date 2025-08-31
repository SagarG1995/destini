import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../features/home/screens/Home'
import Profile from '../../features/profile/screens/Profile'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator()

const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='tabs'
        >
            <Stack.Screen name="tabs" component={BottomTabNavigator} />

        </Stack.Navigator>
    )
}

export default DashboardNavigator