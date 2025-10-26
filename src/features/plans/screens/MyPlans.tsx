import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import PlanCard from '../component/PlanCard'
import { fonts } from '../../../shared/constants/fonts'
import { getMyPlans } from '../plansApi'
import { showToast } from '../../../shared/utils/toast'
import { useAppDispatch } from '../../../redux/store'
import { setMyPlans } from '../planSlice'

const MyPlans = () => {

    const dispatch = useAppDispatch()


    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getPlans()
    }, [])

    const getPlans = () => {
        setLoader(true)
        getMyPlans().then(res => {
            if (res?.success) {
                setPlans(res?.data?.data ?? [])
                dispatch(setMyPlans(res?.data?.data))
            } else {
                showToast(res?.message)
            }
        }).finally(() => setLoader(false))
    }

    const renderItem = useCallback(({ item, _index }: any) => {
        return (
            <PlanCard data={item} />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    const listEmptyComponent = useCallback(() =>
        !loader ?
            <Text style={styles.label}>No Plans created</Text>
            :
            null
        , [loader])

    return (
        <View style={styles.container}>
            <Header showSearchBox={false} showPlanCounter />

            <FlatList
                data={plans}
                keyExtractor={(item: any, index) => index + '' + item?._id}
                renderItem={renderItem}
                style={styles.listStyle}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
                scrollEnabled
                nestedScrollEnabled
                ListEmptyComponent={listEmptyComponent}
                refreshing={loader}
                onRefresh={getPlans}
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
    },
    label: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        textAlign: 'center'
    }
})