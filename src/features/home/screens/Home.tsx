/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import TripCard from '../component/TripCard'
import { fonts } from '../../../shared/constants/fonts'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import { getMe } from '../../profile/profileApi'
import { getHomePlans, getProfessions } from '../homeApi'
import { showToast } from '../../../shared/utils/toast'
import NoTripComponent from '../component/NoTripComponent'
import { getActivities, getMyPlans } from '../../plans/plansApi'

const Home = () => {

    const onEndReachedCalledDuringMomentum = useRef(true)

    const [isOpen, setIsopen] = useState(false)
    const [profession, setProfession] = useState('')
    const [search, setSearch] = useState('')
    const [plans, setPlans] = useState<Array<any>>([])
    const [loading, setLoading] = useState(false) // initial or refresh loader
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getMe()
        getMyPlans()
        getActivities()
        getProfessions()
    }, [])

    useEffect(() => {
        loadInitial();
    }, [profession, search]);

    useEffect(() => {
        if (page === 1 || refreshing) return;
        loadMore();
    }, [page,]);

    const loadInitial = async () => {
        setLoading(true);
        setRefreshing(true)
        try {
            const result = await getHomePlans(search, profession, page)
            const resdata = result?.data?.data ?? []
            // console.log(resdata?.length);

            if (result?.success) {
                setPlans(resdata)
                setHasMore(resdata?.length > 0);
                setPage(1)
            } else {
                showToast(result?.message)
            }

        } catch (error) {
            console.error('Initial load error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false)
        }
    };

    const loadMore = async () => {

        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const result: any = await getHomePlans(search, profession, page);
            const resdata = result?.data?.data
            if (result?.success) {
                if (result?.data?.page === result?.data?.totalPages) {
                    setHasMore(false)
                }
                setPlans(prev => [...prev, ...resdata]);
            } else {
                showToast(result?.message)
            }
        } catch (error) {
            console.error('load more error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const result: any = await getHomePlans("", "", 1);
            const resdata = result?.data?.data
            if (result?.success) {
                setPlans(resdata);
                setPage(1);
                setHasMore(resdata?.length > 0);
            } else {
                showToast(result?.message)
            }
        } catch (error) {
            console.error('Refresh error:', error);
        } finally {
            setRefreshing(false);
        }
    }, [getHomePlans]);

    const toogleModal = useCallback(() => {
        setIsopen(!isOpen)
    }, [isOpen])

    const renderItem = useCallback(({ item }: any) => <TripCard data={item} />, [plans])

    const listEmptyComponent = useCallback(
        () => (!loading && !refreshing) && <NoTripComponent />,
        [loading, refreshing]
    )

    const separator = useCallback(() => <View style={styles.separator} />, [])

    const renderFooter = useCallback(() => {
        if (!loading || refreshing || plans.length === 0) return null
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.black} />
            </View>
        )
    }, [loading, refreshing])

    return (
        <View style={styles.container}>
            <Header toogleModal={toogleModal} onSearch={setSearch} />
            {
                (
                    <>
                        {plans?.length > 0 && (
                            <Text style={styles.heading}>Plans you might like!</Text>
                        )}
                        <FlatList
                            data={plans}
                            renderItem={renderItem}
                            keyExtractor={(_, index) => index.toString()}
                            style={styles.listStyle}
                            contentContainerStyle={styles.listContainer}
                            ItemSeparatorComponent={separator}
                            ListEmptyComponent={listEmptyComponent}
                            ListFooterComponent={renderFooter}
                            onMomentumScrollBegin={() => {
                                onEndReachedCalledDuringMomentum.current = false;
                            }}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => {
                                if (!onEndReachedCalledDuringMomentum.current) {
                                    if (!loading && hasMore) {
                                        setPage(prev => prev + 1);
                                        onEndReachedCalledDuringMomentum.current = true;
                                    }
                                }
                            }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[colors.black]}
                                />
                            }
                        />
                    </>
                )}

            {
                isOpen &&
                <ProfessionModal
                    isOpen={isOpen}
                    toggleModal={toogleModal}
                    onChooseProfession={setProfession}
                />
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    heading: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.black,
        marginTop: 20,
        marginLeft: 20,
    },
    listStyle: {
        marginTop: 10,
    },
    listContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    separator: {
        marginTop: 15,
    },
    footerLoader: {
        paddingVertical: 20,
    },
})
