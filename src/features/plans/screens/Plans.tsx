/* eslint-disable react-hooks/exhaustive-deps */
import { View, StyleSheet, Image, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../component/Header'
import { colors } from '../../../shared/constants/colors'
import CustomButton from '../../../shared/component/CustomButton'
import { icons } from '../../../shared/constants/icons'
import { useNavigation } from '@react-navigation/native'
import TopTripCard from '../component/TopTripCard'
import { useAppSelector } from '../../../redux/store'
import { getTopPicksPlans } from '../plansApi'
import ProfessionModal from '../../../shared/component/ProfessionModal'
import { showToast } from '../../../shared/utils/toast'
import NoTripComponent from '../../home/component/NoTripComponent'

const Plans = () => {

    const navigation = useNavigation<any>()
    const { myPlans } = useAppSelector(state => state?.plan)
    const onEndReachedCalledDuringMomentum = useRef(true)

    const [plans, setPlans] = useState<Array<any>>([])
    const [isOpen, setIsopen] = useState(false)
    const [search, setSearch] = useState('')
    const [profession, setProfession] = useState('')
    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [footerLoading, setFooterLoading] = useState(false)

    useEffect(() => {
        setPage(1)
        setPlans([])
        getTopPicks(1, true)

    }, [profession, search])

    useEffect(() => {
        if (page > 1) {
            getTopPicks(page);
        }
    }, [page]);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setProfession('')
    //         setSearch('')
    //     });
    //     return unsubscribe;
    // }, [navigation])

    const getTopPicks = useCallback((pageNumber = 1, isRefreshing = false) => {

        if (isRefreshing) setLoader(true)
        else setFooterLoading(true)

        getTopPicksPlans(search, profession, page).then(res => {
            if (res?.success) {
                const newData = res?.data?.data ?? []
                setPlans(prev => (pageNumber === 1 ? newData : [...prev, ...newData]))
                setHasMore(newData.length > 0)
            } else {
                showToast(res?.message)
            }
        }).finally(() => {
            setLoader(false)
            setFooterLoading(false)
        })
    }, [profession, search])

    const handleLoadMore = useCallback(() => {
        if (!footerLoading && hasMore && plans.length > 0 &&
            !onEndReachedCalledDuringMomentum.current) {
            const nextPage = page + 1
            setPage(nextPage)
            // getTopPicks(nextPage)
            onEndReachedCalledDuringMomentum.current = true
        }
    }, [footerLoading, hasMore, page])

    const onRefresh = useCallback(() => {
        setPage(1)
        setPlans([])
        getTopPicks(1, true)
    }, [])

    const toogleModal = useCallback(() => {
        setIsopen(!isOpen)
    }, [isOpen])


    const renderItem = useCallback(({ item, _index }: any) => {
        return (
            <TopTripCard data={item} />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    const listEmptyComponent = useCallback(
        () => !loader && <NoTripComponent />,
        [loader]
    )

    return (
        <View style={styles.container}>
            <Header onSearch={setSearch} toogleModal={toogleModal} />
            <View style={styles.buttonContainer}>
                <CustomButton
                    label='Create a plan'
                    containerStyle={styles.button}
                    onPress={() => navigation.navigate('createplan')}
                    leftIcon={<Image source={icons.plans} style={styles.calenderIcon} resizeMode='contain' />}
                />
                <CustomButton
                    label='My plans'
                    badgeCount={myPlans?.length ?? 0}
                    containerStyle={styles.button}
                    onPress={() => navigation.navigate('myplans')}
                    leftIcon={<Image source={icons.calenderheart} style={styles.calenderIcon} resizeMode='contain' />}
                />
            </View>

            <FlatList
                data={plans}
                keyExtractor={(item, index) => index + ''}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={separator}
                refreshing={loader}
                onRefresh={getTopPicks}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListEmptyComponent={listEmptyComponent}
                onMomentumScrollBegin={() => {
                    onEndReachedCalledDuringMomentum.current = false
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={loader}
                        onRefresh={onRefresh}
                        colors={[colors.black]}
                    />
                }
            />

            {
                isOpen &&
                <ProfessionModal
                    isOpen={isOpen}
                    toggleModal={toogleModal}
                    onChooseProfession={(e => setProfession(_prev => e))}
                />
            }

        </View>
    )
}

export default Plans

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 20
    },
    button: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calenderIcon: {
        width: 20,
        height: 20,
        marginRight: 10
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