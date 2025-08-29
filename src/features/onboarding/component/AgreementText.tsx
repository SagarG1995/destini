import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fonts } from '../../../shared/constants/fonts';
import { colors } from '../../../shared/constants/colors';

const AgreementText = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                By signing up, you agree to our{' '}
                <Text style={styles.link}>Terms</Text>. See how we use your data in our{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
            </Text>
        </View>
    );
};

export default AgreementText;

const styles = StyleSheet.create({
    container: {
        marginTop: 'auto',
        paddingVertical: 20
    },
    text: {
        fontSize: 12,
        fontFamily: fonts.italic,
        color: colors.black,
        lineHeight: 20,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'underline'
    },
});
