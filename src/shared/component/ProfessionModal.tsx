/* eslint-disable react-hooks/exhaustive-deps */
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    SectionList,
    RefreshControl
} from 'react-native'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { icons } from '../constants/icons'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
// import { profession } from '../constants/_dev_profession'
import ProfessionItem from './ProfessionItem'
import ProfessionItemHead from './ProfessionItemHead'
import CustomBottomSheet from './CustomBottomSheet'
import { showToast } from '../utils/toast'
import { useAppSelector } from '../../redux/store'
import { getProfessions } from '../../features/home/homeApi'

interface ProfessionModalInterface {
    isOpen?: boolean,
    toggleModal?: () => void,
    isFilter?: boolean,
    onChooseProfession?: (value: string) => void
}

const ProfessionModal: FC<ProfessionModalInterface> = ({
    isOpen = false,
    toggleModal,
    isFilter = false,
    onChooseProfession
}) => {

    const { allProfessions } = useAppSelector(state => state?.profile)

    const [searchText, setSearchText] = useState('')
    const [loader, setLoader] = useState(true)
    const [profession, setProfession] = useState<Array<any>>([])
    const [selectedProfession, setSelectedProfession] = useState('')


    const getAllProfessions = () => {
        setLoader(true)
        getProfessions().then((res: any) => {
            if (!res?.success) {
                showToast(res?.message)
            }

        }).finally(() => setLoader(false))
    }

    const handleOnSave = useCallback(() => {
        if (!isFilter) {
            onChooseProfession?.(selectedProfession)
        }
        toggleModal?.()
    }, [selectedProfession, searchText])

    const filterProfessions = useCallback((text: string) => {
        setSearchText(text)
        if (!text.trim()) {
            setProfession(allProfessions)
            return
        }

        const filtered = allProfessions
            .map((section: any) => {
                const filteredData = section?.data.filter((item: any) =>
                    item.title.toLowerCase().includes(text.toLowerCase())
                )
                return { ...section, data: filteredData }
            })
            .filter(section => section.data.length > 0)

        setProfession(filtered)
    }, [allProfessions, profession, allProfessions])


    const renderItem = useCallback(({ item, _index }: any) => {
        return (
            <ProfessionItem
                selectedProfession={selectedProfession}
                item={item}
                onChooseProfession={setSelectedProfession} />
        )
    }, [selectedProfession, searchText])

    const onSearchTextUpdate = useCallback((e: string) => {
        if (e === undefined || e === null) return;
        const text = e.trim();
        if (text.length === 0) {
            return;
        }
        filterProfessions(text);
    }, [])

    useEffect(() => {
        const t = setTimeout(() => {
            setProfession(allProfessions)
            setLoader(false)
        }, 1000);

        return () => clearTimeout(t)
    }, [])

    const listEmptyComponent = useCallback(() => {
        if (loader) return null
        return (
            <Text style={styles.emptyText}>No Searched Item.</Text>
        )
    }, [loader])


    return (
        <CustomBottomSheet isOpen={isOpen} toggleModal={toggleModal}>
            <View style={styles.header}>
                <View style={styles.headingContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
                        <Image
                            source={icons.arrowback}
                            style={styles.backIcon}
                            tintColor={colors.white}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Professions</Text>
                    <TouchableOpacity style={styles.btn} onPress={handleOnSave}>
                        <Text style={styles.btnText}>
                            {isFilter ? 'Reset' : 'Save'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBox}>
                    <Image
                        source={icons.searchbtn}
                        style={styles.searchIcon}
                        resizeMode="contain"
                    />
                    <TextInput
                        value={searchText}
                        onChangeText={onSearchTextUpdate}
                        placeholder="Search Professions"
                        placeholderTextColor={colors.grey3}
                        style={styles.input}
                    />
                </View>
            </View>

            <SectionList
                sections={profession}
                keyExtractor={(item, index) => item.title + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <ProfessionItemHead title={title} />
                )}
                style={[styles.list]}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true}
                refreshControl={<RefreshControl refreshing={loader} onRefresh={getAllProfessions} tintColor={colors.white} />}
                ListEmptyComponent={listEmptyComponent}
            />

        </CustomBottomSheet>
    )
}

export default memo(ProfessionModal)

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        borderBottomColor: colors.grey3,
        borderBottomWidth: 0.7,
        paddingBottom: 20,
    },
    mt_10: {
        marginTop: 10
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    iconButton: {
        flex: 0.2,
        paddingVertical: 10
    },
    backIcon: {
        width: 25,
        height: 25,
    },
    heading: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        includeFontPadding: false
    },
    btn: {
        flex: 0.2,
        justifyContent: 'center',
        paddingVertical: 10
    },
    btnText: {
        fontSize: 14,
        fontFamily: fonts.bold,
        color: colors.white,
        textAlign: 'center',
        includeFontPadding: false
    },
    searchBox: {
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 10
    },
    searchIcon: {
        width: 40,
        height: 40,
    },
    input: {
        flex: 1,
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.black,
        includeFontPadding: false
    },
    list: {
        flex: 1,
    },
    listContainer: {
        backgroundColor: colors.white,
    },
    emptyText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.black,
        textAlign: 'center',
        includeFontPadding: false,
        lineHeight: 30
    }
})
