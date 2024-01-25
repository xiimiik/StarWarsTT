import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '../utils';

type Props = {
  title: string;
  count: number;
};

export const CounterBox: React.FC<Props> = ({ title, count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'translucent',
    width: 110,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  count: {
    ...typography.h2,
    color: colors.white,
  },
  title: {
    ...typography.secondary,
    color: colors.lightGray,
  },
});
