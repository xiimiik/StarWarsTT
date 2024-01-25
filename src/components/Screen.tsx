import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../utils';

export const Screen = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom,
        paddingRight: insets.right + 20,
        paddingLeft: insets.left + 20,
        backgroundColor: colors.darkBlue,
      }}>
      {children}
    </View>
  );
};
