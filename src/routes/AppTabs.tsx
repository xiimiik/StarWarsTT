import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HeartIcon from '../assets/icons/heart.svg';
import ManIcon from '../assets/icons/man.svg';
import { CharactersListScreen, FavoritesScreen } from '../screens';
import { AppTabParamList } from '../types';
import { colors } from '../utils';

const BottomTab = createBottomTabNavigator<AppTabParamList>();

const screenOptions = (route: string, color: string) => {
  switch (route) {
    case 'CHARACTERS_LIST':
      return <ManIcon style={{ color }} />;
    case 'FAVORITES':
      return <HeartIcon style={{ color }} />;
    default:
      return <></>;
  }
};

export const AppTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route.name, color),
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 2,
          borderTopColor: colors.white,
        },
        tabBarItemStyle: {
          height: 60,
          paddingVertical: 10,
        },
        tabBarActiveBackgroundColor: colors.darkBlue,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.darkBlue,
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen
        name="CHARACTERS_LIST"
        component={CharactersListScreen}
        options={{ headerShown: false, title: 'Characters' }}
      />
      <BottomTab.Screen
        name="FAVORITES"
        component={FavoritesScreen}
        options={{ headerShown: false, title: 'Favorites' }}
      />
    </BottomTab.Navigator>
  );
};
