import AsyncStorage from '@react-native-async-storage/async-storage';

import { ICharacterWithDetails } from '../types';

export const toggleFavorite = async (
  character: ICharacterWithDetails,
): Promise<void> => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isCharacterFavorite(character, favorites)) {
      favorites = favorites.filter(
        (fav: ICharacterWithDetails) => fav.url !== character.url,
      );
    } else {
      favorites.push(character);
    }

    await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

export const isCharacterFavorite = (
  character: ICharacterWithDetails,
  favorites: ICharacterWithDetails[],
): boolean => {
  return favorites.some(
    (fav: ICharacterWithDetails) => fav.url === character.url,
  );
};

export const getFavorites = async (): Promise<ICharacterWithDetails[]> => {
  try {
    const storedFavorites = await AsyncStorage.getItem('favoriteCharacters');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const clearFavorites = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('favoriteCharacters');
  } catch (error) {
    console.error('Error clearing favorites:', error);
  }
};
