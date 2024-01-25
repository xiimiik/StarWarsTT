import { StyleSheet } from 'react-native';

export const colors = {
  white: '#ffffff',
  black: '#000000',
  gray: '#787878',
  lightGray: '#CDCDCD',
  darkBlue: '#1B2033',
  red: '#FF0000',
  transparent: 'transparent',
};

export const typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    color: colors.white,
    fontWeight: '500',
  },
  h2: {
    fontSize: 24,
    color: colors.black,
    fontWeight: '500',
  },
  h3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  secondary: {
    fontSize: 12,
    color: colors.gray,
  },
  tabBar: {
    fontSize: 10,
  },
});
