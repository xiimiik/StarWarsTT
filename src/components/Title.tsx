import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Arrow from '../assets/icons/arrow-left.svg';
import { colors, typography } from '../utils';

type Props = {
  title: string;
  onPress?: () => void;
};

export const Title: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
          <Arrow width={24} height={24} style={{ color: colors.white }} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    ...typography.h1,
  },
});
