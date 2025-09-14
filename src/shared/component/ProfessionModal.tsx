import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    SectionList
} from 'react-native'
import React, { FC, memo, useCallback, useState } from 'react'
import { icons } from '../constants/icons'
import { colors } from '../constants/colors'
import { fonts } from '../constants/fonts'
import { profession } from '../constants/_dev_profession'
import ProfessionItem from './ProfessionItem'
import ProfessionItemHead from './ProfessionItemHead'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet from './BottomSheet'

interface ProfessionModalInterface {
    isOpen?: boolean,
    toggleModal?: () => void,
    isFilter?: boolean,
    addMarginBottom?: boolean
}

const ProfessionModal: FC<ProfessionModalInterface> = ({
    isOpen = false,
    toggleModal,
    isFilter = false,
    addMarginBottom = false
}) => {

    const insets = useSafeAreaInsets()
    // const snapPoints = useMemo(() => ["50%", "90%"], []);

    const [searchText, setSearchText] = useState('')


    const headerComponent = useCallback(() => {
        return (
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
                    <TouchableOpacity style={styles.btn}>
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
                        onChangeText={setSearchText}
                        placeholder="Search Professions"
                        placeholderTextColor={colors.grey3}
                        style={styles.input}
                    />
                </View>
            </View>
        )
    }, [isFilter])

    return (
        <BottomSheet isOpen={isOpen} toggleModal={toggleModal}>
            <SectionList
                sections={profession}
                keyExtractor={(item, index) => item.title + index}
                renderItem={({ item }) => <ProfessionItem item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <ProfessionItemHead title={title} />
                )}
                style={[styles.list]}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={true} // set to true if you want sticky headers
                ListHeaderComponent={headerComponent}
            />
        </BottomSheet>
    )
}

export default memo(ProfessionModal)

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.black,
        paddingHorizontal: 20,
        borderBottomColor: colors.grey3,
        borderBottomWidth: 0.7,
        paddingBottom: 20
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.black,
        paddingTop: 10
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
        // backgroundColor: 'red',
        paddingVertical: 10
    },
    btnText: {
        fontSize: 12,
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
    mb_100: {
        marginBottom: 100
    }
})
