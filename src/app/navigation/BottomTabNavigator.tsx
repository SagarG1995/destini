import { Image, StyleSheet } from 'react-native'
import React, { useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../features/home/screens/Home';
import { icons } from '../../shared/constants/icons';
import Plans from '../../features/plans/screens/Plans';
import Chat from '../../features/chat/screens/Chat';
import Profile from '../../features/profile/screens/Profile';
import { colors } from '../../shared/constants/colors';
import { fonts } from '../../shared/constants/fonts';
import FooterTabMenu from './component/FooterTabMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../../features/profile/screens/EditProfile';


const ProfileStackNavigator = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='userprofile'>
            <ProfileStackNavigator.Screen name="userprofile" component={Profile} />
            <ProfileStackNavigator.Screen name="editprofile" component={EditProfile} />
        </ProfileStackNavigator.Navigator>
    );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const renderIcon = (icon: any,) => (
        <Image source={icon} style={styles.icon} resizeMode="contain" />
    );

    const renderTabBar = useCallback((props: any) => {
        return <FooterTabMenu {...props} />
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={renderTabBar}
            initialRouteName="home"
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.home),
                    // tabBarLabel: ({ _focused }: any) => renderLabel('Home'),
                }}
            />

            <Tab.Screen
                name="plans"
                component={Plans}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.plans),
                    // tabBarLabel: ({ _focused }: any) => renderLabel('Plans'),
                }}
            />

            <Tab.Screen
                name="chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.chat),
                    // tabBarLabel: ({ _focused }: any) => renderLabel('Chat'),
                }}
            />

            <Tab.Screen
                name="profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.profile),
                    // tabBarLabel: ({ _focused }: any) => renderLabel('Profile'),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    label: {
        fontFamily: fonts.semibold,
        fontSize: 12,
        color: colors.white,
        marginLeft: 2
    },

})