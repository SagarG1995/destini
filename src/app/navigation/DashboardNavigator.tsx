import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import GroupChat from '../../features/chat/screens/GroupChat'

const Stack = createNativeStackNavigator()

const DashboardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='tabs'
        >
            <Stack.Screen name="tabs" component={BottomTabNavigator} />
            <Stack.Screen name='groupchat' component={GroupChat} />
        </Stack.Navigator>
    )
}

export default DashboardNavigator