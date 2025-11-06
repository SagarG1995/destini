import { StyleSheet, ScrollView } from 'react-native'
import React, { FC, memo } from 'react'
import RequestCard from './RequestCard';


interface ExpandedRequestInterface {
    data: Array<any>
}

const ExpandedRequest: FC<ExpandedRequestInterface> = ({
    data = []
}) => {

    return (
        <ScrollView style={styles.listStyle} nestedScrollEnabled showsVerticalScrollIndicator>
            {
                data.map((item, index) =>
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
        maxHeight: 150,
    },
    listContainer: {
        paddingVertical: 8, // padding instead of flexGrow
    },
    separator: {
        marginTop: 10
    }
})