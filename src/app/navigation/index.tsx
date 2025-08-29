
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import Splash from '../../features/splash/screens/Splash'
import Onboarding from '../../features/onboarding/screens/Onboarding'
import Login from '../../features/auth/screens/Login'
import DashboardNavigator from './DashboardNavigator'

const Navigation = () => {

    return (
        <NavigationContainer>
            {/* {isLoading ? <Splash /> : <AuthNavigator />} */}
            {/* <Splash /> */}
            {/* <AuthNavigator /> */}
            <DashboardNavigator />
        </NavigationContainer>
    )
}

export default Navigation