import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../features/home/screens/Home'

const Stack = createNativeStackNavigator()

const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='home'
        >
            <Stack.Screen name='home' component={Home} />

        </Stack.Navigator>
    )
}

export default DashboardNavigator