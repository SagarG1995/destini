import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './navigation'
import AppStatusBar from '../shared/component/AppStatusBar'
import { colors } from '../shared/constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

const App = () => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Provider store={store}>
                    <AppStatusBar backgroundColor={colors.white} barStyle='dark-content' />
                    <Navigation />
                </Provider>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})