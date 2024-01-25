import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
  Button,
  CharacterCard,
  EmptyList,
  Screen,
  Separator,
  Title,
} from '../components';
import { AppTabScreenProps, ICharacterWithDetails } from '../types';
import { getFavorites, isCharacterFavorite, toggleFavorite } from '../utils';

export const FavoritesScreen: React.FC<AppTabScreenProps<'FAVORITES'>> = ({
  navigation,
}) => {
  const [favorites, setFavorites] = useState<ICharacterWithDetails[] | []>([]);

  const checkFavorite = useCallback(async () => {
    const favoritesData = await getFavorites();
    setFavorites(favoritesData);
  }, []);

  const clearFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('favoriteCharacters');
      await checkFavorite();
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  }, []);

  const handleToggleFavorite = useCallback(
    async (character: ICharacterWithDetails) => {
      await toggleFavorite(character);
      await checkFavorite();
    },
    [],
  );

  const renderListItem = useCallback(
    ({ item }: { item: ICharacterWithDetails }) => {
      const isFavorite = isCharacterFavorite(item, favorites);

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('CHARACTER_SCREEN', {
              character: item,
              isFavorite: isFavorite,
            });
          }}>
          <CharacterCard
            character={item}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        </TouchableOpacity>
      );
    },
    [favorites],
  );

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
    }, []),
  );

  return (
    <Screen>
      <View style={styles.title}>
        <Title title="Favorites" />
        <Button title=" Clear Fans" onPress={clearFavorites} />
      </View>

      <FlatList
        data={favorites}
        contentContainerStyle={styles.listContentContainer}
        renderItem={renderListItem}
        keyExtractor={item => item.url}
        ItemSeparatorComponent={Separator(16)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList title="List is empty :(" />}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
