import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MediaScreenNavigation = NativeStackNavigationProp<
  {Media: {type: 'movie' | 'serie'} | undefined},
  'Media'
>;

export interface MediaItemProps {
  item: any;
  index?: number;
  showNumber?: boolean;
  onPress?: (item: Media, type: 'serie' | 'movie') => void;
}

export interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface HeaderBarProps {
  onSearchPress: () => void;
}

export interface FeaturedMediaProps {
  item: any;
  onPress?: (item: Media, type: 'serie' | 'movie') => void;
}

export interface PopularMediaSectionProps {
  movies: Media[];
  title: string;
  onPress?: (item: Media, type: 'serie' | 'movie') => void;
}
