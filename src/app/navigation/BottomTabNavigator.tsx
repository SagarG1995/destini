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
import MyPlans from '../../features/plans/screens/MyPlans';
import CreatePlan from '../../features/plans/screens/CreatePlan';


const ProfileStackNavigator = createNativeStackNavigator();
const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='userprofile'>
            <ProfileStackNavigator.Screen name="userprofile" component={Profile} />
            <ProfileStackNavigator.Screen name="editprofile" component={EditProfile} />
        </ProfileStackNavigator.Navigator>
    );
};

const PlanStackNavigator = createNativeStackNavigator();
const PlanStack = () => {
    return (
        <PlanStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='topplans'>
            <PlanStackNavigator.Screen name="topplans" component={Plans} />
            <PlanStackNavigator.Screen name="myplans" component={MyPlans} />
            <PlanStackNavigator.Screen name='createplan' component={CreatePlan} />
        </PlanStackNavigator.Navigator>
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
                }}
            />

            <Tab.Screen
                name="plans"
                component={PlanStack}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.plans),
                }}
            />

            <Tab.Screen
                name="chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.chat),
                }}
            />

            <Tab.Screen
                name="profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ _focused }: any) => renderIcon(icons.profile),
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