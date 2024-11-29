import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
  Button,
  CharacterCard,
  CounterBox,
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
  const [sexCount, setSexCount] = useState({
    male: 0,
    female: 0,
    other: 0,
  });

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

  const updateSexCount = useCallback(() => {
    const count = favorites.reduce(
      (acc, character) => {
        const gender = character.gender.toLowerCase();

        switch (gender) {
          case 'male':
            acc.male += 1;
            break;
          case 'female':
            acc.male += 1;
            break;
          default:
            acc.other += 1;
        }

        return acc;
      },
      { male: 0, female: 0, other: 0 },
    );
    setSexCount(count);
  }, [favorites]);

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
    }, []),
  );

  useEffect(() => {
    updateSexCount();
  }, [favorites]);

  return (
    <Screen>
      <View style={styles.title}>
        <Title title="Favorites" />
        <Button title=" Clear Fans" onPress={clearFavorites} />
      </View>

      <View style={styles.countersContainer}>
        <CounterBox title="Female Fans" count={sexCount.female} />
        <CounterBox title="Male Fans" count={sexCount.male} />
        <CounterBox title="Other" count={sexCount.other} />
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
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
