import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppStack } from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
