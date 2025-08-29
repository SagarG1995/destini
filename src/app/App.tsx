import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Navigation from './navigation'
import AppStatusBar from '../shared/component/AppStatusBar'
import { colors } from '../shared/constants/colors'

const App = () => {

    return (
        <GestureHandlerRootView style={styles.container}>
            <AppStatusBar backgroundColor={colors.white} barStyle='dark-content' />
            <Navigation />
        </GestureHandlerRootView>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})