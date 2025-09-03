import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, StyleProp } from 'react-native'
import React, { FC, memo } from 'react'
import CacheImage from '../../../shared/component/CacheImage'
import { fonts } from '../../../shared/constants/fonts'
import { colors } from '../../../shared/constants/colors'
import { images } from '../../../shared/constants/images'
import { icons } from '../../../shared/constants/icons'

interface RequestCardInterface {
    data?: any,
    containerStyle?: StyleProp<ViewStyle>
}

const RequestCard: FC<RequestCardInterface> = ({
    data = null,
    containerStyle
}) => {

    if (!data) return null

    return (
        <View style={[styles.container, containerStyle]}>
            <CacheImage
                uri='https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
                style={styles.image}
                resizeMode='cover'
            />
            <Text style={styles.label}>Raghav requested to join your plan.</Text>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image source={icons.like} style={styles.icon} resizeMode='contain' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={icons.dislike} style={styles.icon} resizeMode='contain' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(RequestCard)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2
    },
    label: {
        flex: 1,
        fontFamily: fonts.semibold,
        fontSize: 10,
        color: colors.black,
        marginLeft: 10
    },
    button: {
        marginLeft: 10,
    },
    icon: {
        width: 30,
        height: 30
    }
})