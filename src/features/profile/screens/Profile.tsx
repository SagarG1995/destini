import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { colors } from '../../../shared/constants/colors'
import Header from '../component/Header'
import ProfileCard from '../component/ProfileCard'
import { fonts } from '../../../shared/constants/fonts'
import ActivityCard from '../component/ActivityCard'

const Profile = () => {


    const renderItem = useCallback(() => {
        return (
            <ActivityCard />
        )
    }, [])

    const separator = useCallback(() => <View style={styles.separator} />, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <ProfileCard />
                <View style={styles.listHeader}>
                    <Text style={styles.heading}>My Activities</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>See All {'>>'}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={[{}, {}, {}, {}]}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={separator}
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
        marginTop: 25,
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
    listContainer: {
        flexGrow: 1,
        paddingBottom: 100
    },
    separator: {
        marginTop: 15
    }
})