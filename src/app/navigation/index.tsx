
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DashboardNavigator from './DashboardNavigator'
import AuthNavigator from './AuthNavigator'
import Splash from '../../features/splash/screens/Splash'

const Navigation = () => {

    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setShowSplash(false)
        }, 2500);

        return () => clearTimeout(t)
    }, [])

    return (
        <NavigationContainer>
            {/* {isLoading ? <Splash /> : <AuthNavigator />} */}
            {/* <Splash /> */}
            {
                showSplash ?
                    <Splash />
                    :
                    <AuthNavigator />
            }
            {/* <DashboardNavigator /> */}
        </NavigationContainer>
    )
}

export default Navigation