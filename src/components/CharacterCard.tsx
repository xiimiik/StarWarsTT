import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import HeartFullIcon from '../assets/icons/heart-black.svg';
import HeartIcon from '../assets/icons/heart.svg';
import { ICharacterWithDetails } from '../types';
import { colors, typography } from '../utils';

type Props = {
  character: ICharacterWithDetails;
  favorites: ICharacterWithDetails[];
  onToggleFavorite: (character: ICharacterWithDetails) => Promise<void>;
  isFavorite: boolean;
};

export const CharacterCard: React.FC<Props> = ({
  character,
  onToggleFavorite,
  isFavorite,
}) => {
  const handleToggleFavorite = useCallback(async () => {
    onToggleFavorite(character);
  }, [character, onToggleFavorite]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{character.name}</Text>

        <TouchableOpacity activeOpacity={0.5} onPress={handleToggleFavorite}>
          {isFavorite ? (
            <HeartFullIcon
              width={24}
              height={24}
              style={{ color: colors.black, padding: 16 }}
            />
          ) : (
            <HeartIcon
              width={24}
              height={24}
              style={{ color: colors.black, padding: 16 }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.descContainer}>
        <View style={styles.desc}>
          <Text style={styles.descTitle}>Birth year</Text>
          <Text style={styles.descValue}>{character.birth_year}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descTitle}>Gender</Text>
          <Text style={styles.descValue}>{character.gender}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descTitle}>Home World</Text>
          <Text style={styles.descValue}>
            {character.homeworld?.name || 'unknown'}
          </Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descTitle}>Scpecies</Text>
          <Text style={styles.descValue}>
            {character.species?.name || 'unknown'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h2,
  },
  descContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: {
    marginBottom: 4,
    alignItems: 'center',
  },
  descTitle: {
    ...typography.secondary,
  },
  descValue: {
    ...typography.h3,
  },
});
