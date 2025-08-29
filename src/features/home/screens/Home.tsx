import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'

const Home = () => {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
})