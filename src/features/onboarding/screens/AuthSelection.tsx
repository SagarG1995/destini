import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../shared/constants/colors'
import FastImage from 'react-native-fast-image'
import { gif } from '../../../shared/constants/gif'
import CustomButton from '../../../shared/component/CustomButton'
import AgreementText from '../component/AgreementText'
import { useNavigation } from '@react-navigation/native'

const AuthSelection = () => {

    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <FastImage
                    source={gif.animcard}
                    style={styles.card}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.footer}>
                <CustomButton
                    label='Create an account'
                    containerStyle={styles.button}
                    onPress={() => navigation.navigate('register')}
                />
                <CustomButton
                    label='I have an account'
                    containerStyle={[styles.button, styles.mt_20]}
                    onPress={() => navigation.navigate('login')}
                />
                <AgreementText />
            </View>

        </View>
    )
}

export default AuthSelection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    cardContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '85%',
        height: '100%',
    },
    footer: {
        flex: 0.3,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%'
    },
    mt_20: {
        marginTop: 20
    }
})