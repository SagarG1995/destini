import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './navigation'
import AppStatusBar from '../shared/component/AppStatusBar'
import { colors } from '../shared/constants/colors'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import env from '../api/env'
import { onAuthStateChanged } from '@react-native-firebase/auth'
import { auth } from '../shared/utils/firebaseAuthHelper'

const App = () => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: env.webClientId,
        })
        const subscriber = onAuthStateChanged(auth, handleAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const handleAuthStateChanged = (user: any) => {
        // console.log('firebase AUTH : ', user.toJSON());

    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <Provider store={store}>
                    <AppStatusBar backgroundColor={colors.white} barStyle='dark-content' />
                    <Navigation />
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})