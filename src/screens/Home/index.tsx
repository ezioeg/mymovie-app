import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
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
} from '../../redux/slices/moviesSlice';
import {
  fetchNowPlayingSeries,
  fetchPopularSeries,
  fetchSeriesByGenre,
  fetchSeriesGenres,
  fetchTopRatedSeries,
  fetchUpcomingSeries,
} from '../../redux/slices/seriesSlice';
import MoviesSection from '../../components/MoviesSection';
import FeaturedMovie from '../../components/FeaturedMovie';
import CategoriesOverlay from '../../components/CategoriesOverlay';
import CategoryTabs from '../../components/CategoryTabs';
import {useNavigation} from '@react-navigation/native';
import HeaderBar from '../../components/HeaderBar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type SearchScreenNavigation = NativeStackNavigationProp<
  {Search: {activeCategory: 'movies' | 'series' | 'categories'}},
  'Search'
>;

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<
    'movies' | 'series' | 'categories'
  >('movies');
  const [showCategories, setShowCategories] = useState(false);

  const navigation = useNavigation<SearchScreenNavigation>();
  const dispatch = useAppDispatch();

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

  const handleTabPress = (category: 'movies' | 'series' | 'categories') => {
    setActiveCategory(category);
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'red'}}>{error}</Text>
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
            navigation.navigate('Search', {activeCategory: activeCategory})
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
          {popular.length > 0 && <FeaturedMovie item={popular[0]} />}

          <MoviesSection
            movies={popular}
            title={
              activeCategory === 'movies'
                ? 'Películas Populares'
                : 'Series Populares'
            }
          />
          <MoviesSection
            movies={upcoming}
            title={
              activeCategory === 'movies'
                ? 'Próximamente'
                : 'En emisión próximamente'
            }
          />
          <MoviesSection
            movies={topRated}
            title={
              activeCategory === 'movies'
                ? 'Mejor Valoradas'
                : 'Series Mejor Valoradas'
            }
          />
          <MoviesSection
            movies={nowPlaying}
            title={activeCategory === 'movies' ? 'En Cines' : 'En emisión hoy'}
          />
        </ScrollView>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
