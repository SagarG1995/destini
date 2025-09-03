import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import PlanCard from '../component/PlanCard'

const MyPlans = () => {

    const renderItem = useCallback(() => {
        return (
            <PlanCard />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header showSearchBox={false} showPlanCounter={10} />

            <FlatList
                data={[{}, {}, {}, {}, {}, {}, {}, {}]}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
                scrollEnabled
                nestedScrollEnabled
            />

        </View>
    )
}

export default MyPlans

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    listStyle: {
        marginTop: 20
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 100,
        paddingHorizontal: 20
    },
    separator: {
        marginTop: 15
    }
})