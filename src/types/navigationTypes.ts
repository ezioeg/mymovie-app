import {Category} from './categoryTypes';

export type RootStackParamList = {
  TabNavigator: undefined;
  Media: {type: 'movie' | 'serie'} | undefined;
  Search: {activeCategory: Category};
};
