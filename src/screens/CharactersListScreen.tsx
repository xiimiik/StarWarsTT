import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import {
  fetchAllPersonsWithDetails,
  fetchSearchAllPersonsWithDetails,
} from '../api';
import {
  CharacterCard,
  EmptyList,
  Loader,
  Screen,
  Separator,
  Title,
  Pagination,
} from '../components';
import {
  AppTabScreenProps,
  ICharacterWithDetails,
  ISwapiResponse,
} from '../types';
import { getFavorites, isCharacterFavorite, toggleFavorite } from '../utils';

export const CharactersListScreen: React.FC<
  AppTabScreenProps<'CHARACTERS_LIST'>
> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [people, setPeople] = useState<ISwapiResponse<ICharacterWithDetails>>();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<ICharacterWithDetails[] | []>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getCharacters = useCallback(async (page: number, query: string) => {
    setIsLoading(true);
    const data = query
      ? await fetchSearchAllPersonsWithDetails(query, page)
      : await fetchAllPersonsWithDetails(page);
    setIsLoading(false);

    setPeople(data);
  }, []);

  const checkFavorite = useCallback(async () => {
    const favoritesData = await getFavorites();
    setFavorites(favoritesData);
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

  useEffect(() => {
    getCharacters(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      checkFavorite();
    }, []),
  );

  return (
    <Screen>
      <View style={styles.title}>
        <Title title="Characters" />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by character name"
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          setCurrentPage(1);
        }}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={people?.results || []}
          renderItem={renderListItem}
          keyExtractor={item => item.url}
          ItemSeparatorComponent={Separator(16)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Pagination
              total={people?.count || '0'}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          }
          ListFooterComponentStyle={styles.footerListStyles}
          ListEmptyComponent={<EmptyList title="Nothing :(" />}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  footerListStyles: {
    marginBottom: 32,
  },
});
