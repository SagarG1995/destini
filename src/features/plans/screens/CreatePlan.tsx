import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import CreatePlanForm from '../component/CreatePlanForm'

const CreatePlan = () => {
    return (
        <View style={styles.container}>
            <CreatePlanForm />
        </View>
    )
}

export default CreatePlan

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        // paddingHorizontal: 15
    },
    mt_25: {
        marginTop: 25
    },
    describeBox: {
        height: 100,
        borderRadius: 10,
        borderColor: colors.grey5,
        borderWidth: 0.9,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
        overflow: 'hidden',
        marginTop: 10
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.black
    },
    inputStyle: {
        fontSize: 14,
        color: colors.black,
    },
    multilineInputStyle: {
        flex: 1,
        textAlignVertical: 'top',
        paddingLeft: 10,
        fontSize: 14,
        color: colors.black
    },
    inputContainerStyle: {
        flex: 1,
        height: undefined,
        borderBottomWidth: 0,
        alignItems: undefined,
    },
})