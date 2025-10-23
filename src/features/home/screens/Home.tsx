/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import TripCard from '../component/TripCard'
import { fonts } from '../../../shared/constants/fonts'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import { getMe } from '../../profile/profileApi'
import { useAppDispatch } from '../../../redux/store'
import { setUserData } from '../../profile/profileSlice'
import { getHomePlans } from '../homeApi'
import { useUserLocation } from '../../../shared/hooks/useUserLocation'
import LocationNotEnabledContent from '../component/LocationNotEnabledContent'
import { showToast } from '../../../shared/utils/toast'
import NoTripComponent from '../component/NoTripComponent'

const Home = () => {
    const dispatch = useAppDispatch()
    const { locationLoading, isLocationEnabled, location } = useUserLocation()

    const [isOpen, setIsopen] = useState(false)
    const [profession, setProfession] = useState('')
    const [search, setSearch] = useState('')
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false) // initial or refresh loader
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [footerLoading, setFooterLoading] = useState(false)

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        // reset list when profession or search changes
        setPage(1)
        setPlans([])
        fetchPlans(1, true)
    }, [search, profession, isLocationEnabled])

    const getProfile = useCallback(() => {
        getMe().then(res => {
            if (res?.success) {
                dispatch(setUserData(res?.data?.user))
            }
        })
    }, [])

    const fetchPlans = useCallback(
        async (pageNumber = 1, isRefreshing = false) => {
            if (!isLocationEnabled || !location) return

            if (isRefreshing) setLoading(true)
            else setFooterLoading(true)

            try {
                const res = await getHomePlans(location, search, profession, pageNumber)
                if (res?.success) {
                    const newData = res?.data?.data ?? []
                    setPlans(prev => (pageNumber === 1 ? newData : [...prev, ...newData]))
                    setHasMore(newData.length > 0)
                } else {
                    showToast(res?.message)
                }
            } catch (error) {
                console.log('Error fetching plans:', error)
            } finally {
                setLoading(false)
                setFooterLoading(false)
            }
        },
        [isLocationEnabled, location, search, profession]
    )

    const handleLoadMore = useCallback(() => {
        if (!footerLoading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchPlans(nextPage)
        }
    }, [footerLoading, hasMore, page, fetchPlans])

    const onRefresh = useCallback(() => {
        setPage(1)
        setPlans([])
        fetchPlans(1, true)
    }, [fetchPlans])

    const toogleModal = useCallback(() => {
        setIsopen(!isOpen)
    }, [isOpen])

    const renderItem = useCallback(({ item }: any) => <TripCard />, [])

    const listEmptyComponent = useCallback(
        () => !loading && <NoTripComponent />,
        [loading]
    )

    const separator = useCallback(() => <View style={styles.separator} />, [])

    const renderFooter = useCallback(() => {
        if (!footerLoading) return null
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.black} />
            </View>
        )
    }, [footerLoading])

    return (
        <View style={styles.container}>
            <Header toogleModal={toogleModal} onSearch={setSearch} />
            {!isLocationEnabled && !locationLoading ? (
                <LocationNotEnabledContent />
            ) : (
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
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={onRefresh}
                                colors={[colors.black]}
                            />
                        }
                    />
                </>
            )}

            <ProfessionModal
                isOpen={isOpen}
                toggleModal={toogleModal}
                onChooseProfession={setProfession}
            />
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
        paddingBottom: 30,
    },
    separator: {
        marginTop: 15,
    },
    footerLoader: {
        paddingVertical: 20,
    },
})
