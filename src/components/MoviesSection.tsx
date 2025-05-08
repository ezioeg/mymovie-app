import {View, Text, StyleSheet, FlatList} from 'react-native';
import MovieItem from './MovieItem';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface PopularMoviesSectionProps {
  movies: Movie[];
  title: string;
}

const MovieSection = ({movies, title}: PopularMoviesSectionProps) => {
  const isPopular =
    title === 'Películas Populares' ||
    title === 'Mejor Valoradas' ||
    title === 'Series Populares' ||
    title === 'Series Mejor Valoradas';
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <MovieItem item={item} index={index} showNumber={isPopular} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={isPopular ? {paddingLeft: 15} : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MovieSection;
