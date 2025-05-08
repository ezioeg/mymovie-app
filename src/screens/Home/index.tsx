import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  fetchMoviesByGenre,
  fetchMoviesGenres,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  setSelectedMovie,
} from '../../redux/slices/moviesSlice';
import {
  fetchNowPlayingSeries,
  fetchPopularSeries,
  fetchSeriesByGenre,
  fetchSeriesGenres,
  fetchTopRatedSeries,
  fetchUpcomingSeries,
  setSelectedSerie,
} from '../../redux/slices/seriesSlice';
import MediaSection from '../../components/media/MediaSection';
import MediaFeatureSection from '../../components/media/MediaFeatureSection';
import CategoriesOverlay from '../../components/common/CategoriesOverlay';
import CategoryTabs from '../../components/common/CategoryTabs';
import HeaderBar from '../../components/common/HeaderBar';
import {SearchScreenNavigation} from '../../types/searchTypes';
import {Category} from '../../types/categoryTypes';
import {Media, MediaScreenNavigation} from '../../types/mediaTypes';
import LoadingOverlay from '../../components/common/LoadingOverlay';

export default function HomeScreen() {
  const searchNavigation = useNavigation<SearchScreenNavigation>();
  const movieNavigation = useNavigation<MediaScreenNavigation>();
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<Category>('movies');
  const [showCategories, setShowCategories] = useState(false);

  const moviesState = useAppSelector(state => state.movies);
  const seriesState = useAppSelector(state => state.series);
  const moviesGenres = useAppSelector(state => state.movies.genres);
  const seriesGenres = useAppSelector(state => state.series.genres);

  const {popular, topRated, upcoming, nowPlaying, loading, error} =
    activeCategory === 'movies' ? moviesState : seriesState;

  const genres = activeCategory === 'movies' ? moviesGenres : seriesGenres;

  useEffect(() => {
    if (activeCategory === 'movies') {
      dispatch(fetchPopularMovies());
      dispatch(fetchTopRatedMovies());
      dispatch(fetchUpcomingMovies());
      dispatch(fetchNowPlayingMovies());
    } else {
      dispatch(fetchPopularSeries());
      dispatch(fetchTopRatedSeries());
      dispatch(fetchUpcomingSeries());
      dispatch(fetchNowPlayingSeries());
    }
  }, [dispatch, activeCategory]);

  const handleCategoriesPress = () => {
    activeCategory === 'movies'
      ? dispatch(fetchMoviesGenres())
      : dispatch(fetchSeriesGenres());

    setShowCategories(true);
  };

  const handleGenrePress = (genreId: number) => {
    activeCategory === 'movies'
      ? dispatch(fetchMoviesByGenre(genreId))
      : dispatch(fetchSeriesByGenre(genreId));

    setShowCategories(false);
  };

  const handleTabPress = (category: Category) => {
    setActiveCategory(category);
  };

  const handleFeaturedPress = (item: Media, type: 'serie' | 'movie') => {
    type === 'movie'
      ? dispatch(setSelectedMovie(item))
      : dispatch(setSelectedSerie(item));
    movieNavigation.navigate('Media', {type});
  };

  const handleMovieItemPress = (item: Media, type: 'serie' | 'movie') => {
    type === 'movie'
      ? dispatch(setSelectedMovie(item))
      : dispatch(setSelectedSerie(item));
    movieNavigation.navigate('Media', {type});
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={
        activeCategory === 'series'
          ? ['#710193', '#1e003e', '#000']
          : ['#063970', '#0a0c2f', '#0a0c17', '#000']
      }
      style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <CategoriesOverlay
        visible={showCategories}
        onClose={() => setShowCategories(false)}
        genres={genres}
        handleGenrePress={handleGenrePress}
      />

      <SafeAreaView style={styles.container}>
        <HeaderBar
          onSearchPress={() =>
            searchNavigation.navigate('Search', {
              activeCategory: activeCategory,
            })
          }
        />

        <CategoryTabs
          tabs={[
            {label: 'Series', value: 'series'},
            {label: 'Películas', value: 'movies'},
            {label: 'Categorías', value: 'categories', hasIcon: true},
          ]}
          activeCategory={activeCategory}
          onTabPress={handleTabPress}
          handleCategoriesPress={handleCategoriesPress}
        />

        <ScrollView>
          {popular.length > 0 && (
            <MediaFeatureSection
              item={popular[0]}
              onPress={handleFeaturedPress}
            />
          )}

          <MediaSection
            movies={popular}
            title={
              activeCategory === 'movies'
                ? 'Películas Populares'
                : 'Series Populares'
            }
            onPress={handleMovieItemPress}
          />
          <MediaSection
            movies={upcoming}
            title={
              activeCategory === 'movies'
                ? 'Próximamente'
                : 'En emisión próximamente'
            }
            onPress={handleMovieItemPress}
          />
          <MediaSection
            movies={topRated}
            title={
              activeCategory === 'movies'
                ? 'Mejor Valoradas'
                : 'Series Mejor Valoradas'
            }
            onPress={handleMovieItemPress}
          />
          <MediaSection
            movies={nowPlaying}
            title={activeCategory === 'movies' ? 'En Cines' : 'En emisión hoy'}
            onPress={handleMovieItemPress}
          />
        </ScrollView>
        {loading && <LoadingOverlay />}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {color: 'red'},
});
