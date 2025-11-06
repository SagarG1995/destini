import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../shared/constants/colors'
import EditPlanForm from '../component/EditPlanForm'
import { useRoute } from '@react-navigation/native'

const EditPlan = () => {

    const { plan_details } = useRoute<any>()?.params
    console.log(plan_details);

    return (
        <View style={styles.container}>
            <EditPlanForm data={plan_details} />
        </View>
    )
}

export default EditPlan
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})