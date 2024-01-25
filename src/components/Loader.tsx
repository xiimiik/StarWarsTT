import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import { colors } from '../utils';

export const Loader = () => {
  const [dots, setDots] = useState('');
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length >= 3) {
          return '';
        }

        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <ActivityIndicator size={50} color={colors.white} style={styles.loader} />
      <View style={styles.textContainer}>
        <Text ref={textRef} style={styles.text}>
          Traveling through the galaxy{dots}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  textContainer: {
    minWidth: 150, // Adjust according to your layout
  },
  text: {
    color: colors.white,
    fontSize: 18,
  },
});
