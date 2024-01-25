import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import HeartFullIcon from '../assets/icons/heart-black.svg';
import HeartIcon from '../assets/icons/heart.svg';
import { colors } from '../utils';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
};

export const AddToFavoritesButton: React.FC<Props> = ({
  isFavorite,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        isFavorite ? styles.buttonFavorite : styles.buttonNotFavorite,
      ]}
      onPress={onPress}>
      {isFavorite ? (
        <HeartIcon width={24} height={24} style={{ color: colors.white }} />
      ) : (
        <HeartFullIcon width={24} height={24} style={{ color: colors.black }} />
      )}
      <Text
        style={[
          styles.buttonText,
          isFavorite ? styles.buttonTextFavorite : styles.buttonTextNotFavorite,
        ]}>
        {isFavorite ? 'Favorite' : 'Add to Favorites'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.transparent,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonFavorite: {
    backgroundColor: colors.transparent,
    borderColor: colors.white,
  },
  buttonNotFavorite: {
    backgroundColor: colors.white,
    borderColor: colors.transparent,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextFavorite: {
    color: colors.white,
  },
  buttonTextNotFavorite: {
    color: colors.black,
  },
});
