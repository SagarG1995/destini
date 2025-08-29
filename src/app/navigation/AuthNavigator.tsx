import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../features/auth/screens/Login'
import AuthSelection from '../../features/onboarding/screens/AuthSelection'
import Onboarding from '../../features/onboarding/screens/Onboarding'
import Splash from '../../features/splash/screens/Splash'
import ForgotPassword from '../../features/auth/screens/ForgotPassword'
import VerifyEmail from '../../features/auth/screens/VerifyEmail'
import CreateNewPassword from '../../features/auth/screens/CreateNewPassword'
import Register from '../../features/auth/screens/Register'
import VerifyOtp from '../../features/auth/screens/VerifyOtp'
import CompleteProfile from '../../features/auth/screens/CompleteProfile'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='splash'
        >
            <Stack.Screen name='splash' component={Splash} options={{ animation: 'simple_push' }} />
            <Stack.Screen name='onboarding' component={Onboarding} options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name='authselection' component={AuthSelection} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='forgotpassword' component={ForgotPassword} />
            <Stack.Screen name='verifyemail' component={VerifyEmail} />
            <Stack.Screen name='createnewpassword' component={CreateNewPassword} />
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='verifyotp' component={VerifyOtp} />
            <Stack.Screen name='completeprofile' component={CompleteProfile} />

        </Stack.Navigator>
    )
}

export default AuthNavigator