import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {

    const navigation = useNavigation<any>()
    const insets = useSafeAreaInsets();


    const rootHeaderContainer = useMemo(() => {
        return { paddingTop: insets.top + 20 }
    }, [insets])

    return (
        <View style={[styles.container, rootHeaderContainer]}>
            <Text>Header</Text>
        </View>
    )
}

export default Header


const styles = StyleSheet.create({
    container: {

    },
})