/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import FastImage, { FastImageProps, ImageStyle } from '@d11/react-native-fast-image';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../constants/colors';

interface CachedImageProps extends Partial<FastImageProps> {
    uri: string;
    style?: ImageStyle | any;
    resizeMode?: keyof typeof FastImage.resizeMode;
    fallbackComponent?: React.ReactNode;
}

const CachedImage: FC<CachedImageProps> = ({
    uri,
    style,
    resizeMode = 'cover',
    fallbackComponent,
    ...rest
}) => {

    const [loading, setLoading] = useState(true);
    const loaderOpacity = useSharedValue(1)

    useEffect(() => {
        if (!loading) {
            // Fade out loader
            loaderOpacity.value = withTiming(0, { duration: 300 });
        } else {
            loaderOpacity.value = 1;// Reset if loading again
        }
    }, [loading]);

    const animatedLoaderStyle = useAnimatedStyle(() => ({
        opacity: loaderOpacity.value,
    }));

    if (!uri) return fallbackComponent || null;

    return (
        <View style={[style, styles.container]}>
            {
                // loading &&
                // (
                //     <View style={[styles.loader, animatedLoaderStyle]}>
                //         <ActivityIndicator size={'small'} color={colors.white} />
                //     </View>
                // )
            }
            <FastImage
                {...rest}
                source={{
                    uri,
                    cache: FastImage.cacheControl.immutable, // Ensures aggressive caching
                    priority: FastImage.priority.normal,
                }}
                style={[style]}
                resizeMode={FastImage.resizeMode[resizeMode]}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </View>
    );
};

export default React.memo(CachedImage);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    loader: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: colors.transparentBlack1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
