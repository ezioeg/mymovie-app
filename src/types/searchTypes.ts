import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Category} from './categoryTypes';

export type SearchScreenNavigation = NativeStackNavigationProp<
  {Search: {activeCategory: Category}},
  'Search'
>;
