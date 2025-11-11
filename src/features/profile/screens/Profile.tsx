import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import ProfileCard from '../component/ProfileCard'
import { fonts } from '../../../shared/constants/fonts'
import ActivityCard from '../component/ActivityCard'
import { getActivities } from '../../plans/plansApi'
import { useAppSelector } from '../../../redux/store'
import { showToast } from '../../../shared/utils/toast'

const Profile = () => {

    const { activities } = useAppSelector(state => state?.plan)
    const [activity, setActivity] = useState<Array<any>>([])
    const [loader, setLoader] = useState(false)

    useEffect(() => setActivity(activities), [activities])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        setLoader(true)
        getActivities().then(res => (!res.success) && showToast(res?.message)).finally(() => setLoader(false))
    }


    const renderItem = useCallback(({ item }: any) => {
        return (
            <ActivityCard data={item} />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    const listEmptyComponent = useCallback(() => {
        return (<View style={styles.activityContainer}>
            <Text style={styles.activityLabel}>No Activities</Text>
        </View>)
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <ProfileCard />
                <View style={styles.listHeader}>
                    <Text style={styles.heading}>My Activities</Text>
                    {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>See All {'>>'}</Text>
                    </TouchableOpacity> */}
                </View>
                <FlatList
                    data={activity}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={renderItem}
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={separator}
                    ListEmptyComponent={listEmptyComponent}
                    refreshControl={<RefreshControl refreshing={loader} onRefresh={getData} />}
                />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        paddingHorizontal: 20
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        justifyContent: 'space-between'
    },
    heading: {
        fontFamily: fonts.semibold,
        fontSize: 18,
        color: colors.black,
        includeFontPadding: false,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    btnText: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.blue1,
        includeFontPadding: false,
    },
    listStyle: {
        marginTop: 10
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 80
    },
    separator: {
        marginTop: 15
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    activityLabel: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        textAlign: 'center'
    }
})