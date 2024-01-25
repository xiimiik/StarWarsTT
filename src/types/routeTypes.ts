import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { ICharacterWithDetails } from './';

// TYPE HELPERS ↓

export type Navigation = BottomTabScreenProps<RootStackParamList>;

export type UserState = {
  name: string;
  email: string;
  password: string;
};

// STACK PARAMS ↓

export type AppTabParamList = {
  CHARACTERS_LIST: undefined;
  FAVORITES: undefined;
};

export type RootStackParamList = {
  CHARACTER_SCREEN: {
    character: ICharacterWithDetails;
    isFavorite: boolean;
  };
  MAIN_TABS: NavigatorScreenParams<AppTabParamList>;
};

// ROOT ↓

export type RootStackScreenProps<ROUTE_NAME extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, ROUTE_NAME>;

// SCREENS ↓

export type AppTabScreenProps<ROUTE_NAME extends keyof AppTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, ROUTE_NAME>,
    StackScreenProps<RootStackParamList>
  >;

// GLOBAL ↓

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
