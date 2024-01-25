import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, typography } from '../utils';

type Props = {
  title: string;
  onPress?: () => void;
};

export const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  title: {
    ...typography.h3,
    color: colors.red,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
});
