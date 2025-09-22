
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DashboardNavigator from './DashboardNavigator'
import AuthNavigator from './AuthNavigator'
import Splash from '../../features/splash/screens/Splash'
import { useAppSelector } from '../../redux/store'

const Navigation = () => {

    const { authdata } = useAppSelector(state => state?.auth)
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setShowSplash(false)
        }, 2500);

        return () => clearTimeout(t)
    }, [])

    return (
        <NavigationContainer>
            {
                showSplash ?
                    <Splash />
                    :
                    (authdata?.access_token && authdata?.completeProfile) ?
                        <DashboardNavigator />
                        :
                        <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default Navigation