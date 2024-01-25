import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '../utils/generalStyles';

type Props = {
  title: string;
};

export const EmptyList: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...typography.h3,
    color: colors.white,
  },
});
