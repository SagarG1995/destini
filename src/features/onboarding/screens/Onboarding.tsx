import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { images } from '../../../shared/constants/images'
import { gif } from '../../../shared/constants/gif'
import { colors } from '../../../shared/constants/colors'
import { fonts } from '../../../shared/constants/fonts'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../shared/constants/dimensions'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../../redux/store'
import { setShowOnboarding } from '../../auth/authSlice'

const Onboarding = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef: any = useRef(null);


    useEffect(() => {
        dispatch(setShowOnboarding(false))
    }, [])

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef?.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            // Navigate to Auth or Home Screen
            navigation.replace("authselection");
        }
    };

    const slides = [
        {
            image: images.logo,
            labelImage: images.onboardlabel1
        },
        {
            gif: gif.onboardanim1,
            labelImage: images.onboardlabel2
        },
        {
            gif: gif.onboardanim1,
            labelImage: images.onboardlabel3
        },
    ]

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={handleNext} style={[styles.slide]}>
                <View style={[styles.imageContainer, item.gif && styles.gifContainer]}>
                    {
                        item?.image &&
                        <Image
                            source={item?.image}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    }
                    {
                        item.gif &&
                        <FastImage
                            key={index}
                            source={item.gif}
                            style={styles.gif}
                            resizeMode='contain'
                        />
                    }
                </View>
                <View style={[styles.labelImageContainer]}>
                    {
                        item.labelImage &&
                        <Image
                            source={item?.labelImage}
                            style={styles.labelImage}
                            resizeMode='contain'
                        />
                    }
                </View>
            </TouchableOpacity>
        )
    }

    const pagination = useCallback(() => {
        return (
            <View style={styles.pagination} >
                {
                    slides.map((item, index) =>
                        <View style={[styles.page, currentIndex === index && styles.activePage]} key={index + ''} />
                    )
                }
            </View>
        )
    }, [currentIndex])

    return (
        <View style={styles.container}>
            <View style={styles.topContent}>
                <FlatList
                    ref={flatListRef}
                    data={slides}
                    keyExtractor={(item, index) => index + ''}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    onScroll={handleScroll}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.info}>Tap on the screen</Text>
                {
                    pagination()
                }
            </View>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContent: {
        flex: 0.9,
    },
    bottomContent: {
        flex: 0.1,
    },
    slide: {
        width: SCREEN_WIDTH,
        height: '100%',
    },
    imageContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
    gifContainer: {
        // justifyContent: 'flex-end',
        // backgroundColor: 'red'
    },
    gif: {
        width: SCREEN_HEIGHT * 0.45,
        height: SCREEN_HEIGHT * 0.45,
        // backgroundColor: 'pink'
    },
    labelImageContainer: {
        flex: 0.3,
        paddingLeft: 30,
    },
    labelImage: {
        width: SCREEN_WIDTH * 0.75,
        height: '100%',
    },
    info: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: colors.transparentBlack1,
        textAlign: 'center',
    },
    pagination: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    page: {
        height: 8,
        width: 70,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: colors.transparentBlue1
    },
    activePage: {
        marginBottom: 18,
        backgroundColor: colors.blue1

    }
})