// AvatarGroup.tsx
import React, { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../../shared/constants/colors";
import CacheImage from "../../../shared/component/CacheImage";
import { fonts } from "../../../shared/constants/fonts";

interface AvatarGroupInterface {
    avatars: any[];   // array of image URLs
};

const AvatarGroup: React.FC<AvatarGroupInterface> = ({ avatars = [] }) => {
    const displayAvatars = avatars.length > 0 ? avatars.slice(0, 3) : []
    const extra = avatars.length - 3;


    if (avatars.length === 0) return null

    return (
        <View style={styles.container}>
            {displayAvatars.map((uri, index) => (
                <Image
                    key={index}
                    source={{ uri }}
                    style={[
                        styles.avatar,
                        index !== 0 && styles.overlap, { zIndex: displayAvatars.length - index }
                    ]}
                />
            ))}
            {extra > 0 && (
                <View style={[styles.extra]}>
                    <Text style={styles.extraText}>+{extra}</Text>
                </View>
            )}
        </View>
    );
};

export default memo(AvatarGroup);


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    overlap: {
        marginLeft: -15,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderColor: colors.black,
        borderWidth: 1,
        marginLeft: 0,
        boxShadow: [
            {
                offsetX: 2,
                offsetY: 7,
                blurRadius: 10,
                spreadDistance: -5,
                color: "rgba(52, 51, 51, 0.5)",
            },
        ],
    },
    extra: {
        marginLeft: 5
    },
    extraText: {
        fontFamily: fonts.bold,
        fontSize: 14,
        color: colors.blue1
    },
});


