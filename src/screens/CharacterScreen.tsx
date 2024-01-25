import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AddToFavoritesButton, Screen, Title } from '../components';
import { RootStackScreenProps } from '../types';
import { colors, toggleFavorite, typography } from '../utils';

export const CharacterScreen: React.FC<
  RootStackScreenProps<'CHARACTER_SCREEN'>
> = ({
  navigation,
  route: {
    params: { character, isFavorite },
  },
}) => {
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite);

  const handleToggleFavorite = () => {
    setIsFavoriteLocal(!isFavoriteLocal);
    toggleFavorite(character);
  };

  return (
    <Screen>
      <Title title={character.name} onPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.image}
          source={{
            uri: `https://starwars-visualguide.com/assets/img/characters/${
              character.url.split('/')[5]
            }.jpg`,
          }}
        />

        <AddToFavoritesButton
          isFavorite={isFavoriteLocal}
          onPress={handleToggleFavorite}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Character</Text>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{character.name}</Text>
              <Text style={styles.label}>Height:</Text>
              <Text style={styles.value}>{character.height}</Text>
              <Text style={styles.label}>Mass:</Text>
              <Text style={styles.value}>{character.mass}</Text>
              <Text style={styles.label}>Hair color:</Text>
              <Text style={styles.value}>{character.hair_color}</Text>

              <Text style={styles.label}>Skin color:</Text>
              <Text style={styles.value}>{character.skin_color}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Eye color:</Text>
              <Text style={styles.value}>{character.eye_color}</Text>
              <Text style={styles.label}>Birth year:</Text>
              <Text style={styles.value}>{character.birth_year}</Text>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.value}>{character.gender}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Character’s Planet</Text>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{character.homeworld.name}</Text>
              <Text style={styles.label}>Rotation period:</Text>
              <Text style={styles.value}>
                {character.homeworld.rotation_period}
              </Text>
              <Text style={styles.label}>Orbital period:</Text>
              <Text style={styles.value}>
                {character.homeworld.orbital_period}
              </Text>
              <Text style={styles.label}>Diameter:</Text>
              <Text style={styles.value}>{character.homeworld.diameter}</Text>
              <Text style={styles.label}>Population:</Text>
              <Text style={styles.value}>{character.homeworld.population}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.label}>Climate:</Text>
              <Text style={styles.value}>{character.homeworld.climate}</Text>
              <Text style={styles.label}>Gravity:</Text>
              <Text style={styles.value}>{character.homeworld.gravity}</Text>
              <Text style={styles.label}>Terrain:</Text>
              <Text style={styles.value}>{character.homeworld.terrain}</Text>
              <Text style={styles.label}>Surface water:</Text>
              <Text style={styles.value}>
                {character.homeworld.surface_water}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    gap: 24,
    paddingBottom: 16,
  },
  characterContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    ...typography.h2,
    marginBottom: 10,
  },
  label: {
    ...typography.secondary,
    marginBottom: 4,
  },
  value: {
    ...typography.h3,
    marginBottom: 16,
  },
});
