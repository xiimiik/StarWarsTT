import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { CharacterScreen } from '../screens';
import { RootStackParamList } from '../types';
import { AppTabs } from './AppTabs';

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}>
      <Stack.Screen name="MAIN_TABS" component={AppTabs} />
      <Stack.Screen name="CHARACTER_SCREEN" component={CharacterScreen} />
    </Stack.Navigator>
  );
};
