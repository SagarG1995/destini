import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { FC, memo, useCallback } from 'react'
import RequestCard from './RequestCard';
import { colors } from '../../../shared/constants/colors';

interface ExpandedRequestInterface {
    avatars: any[];
}

const ExpandedRequest: FC<ExpandedRequestInterface> = ({
    avatars = []
}) => {





    return (
        <ScrollView style={styles.listStyle} nestedScrollEnabled showsVerticalScrollIndicator>
            {
                avatars.map((item, index) =>
                    <RequestCard key={index + ''} data={item} containerStyle={index !== 0 ? styles.separator : null} />
                )
            }
        </ScrollView>
    )
}

export default memo(ExpandedRequest)

const styles = StyleSheet.create({
    listStyle: {
        marginTop: 15,
        maxHeight: 100,
    },
    listContainer: {
        paddingVertical: 8, // padding instead of flexGrow
    },
    separator: {
        marginTop: 10
    }
})