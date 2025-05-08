import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchSeriesByTitle} from '../../redux/slices/seriesSlice';
import {
  fetchMoviesByTitle,
  setSelectedMovie,
} from '../../redux/slices/moviesSlice';
import {MediaScreenNavigation} from '../../types/mediaTypes';
import {Category} from '../../types/categoryTypes';
import HeaderBar from '../../components/search/HeaderBar';
import SearchBar from '../../components/search/SearchBar';
import RecommendedItem from '../../components/search/RecommendedItem';

const SearchScreen = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MediaScreenNavigation>();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const moviesState = useAppSelector(state => state.movies);
  const seriesState = useAppSelector(state => state.series);

  const {activeCategory} = route.params as {
    activeCategory: Category;
  };

  const {popular, filteredByTitle} =
    activeCategory === 'movies' ? moviesState : seriesState;

  const listToShow = query.trim().length > 0 ? filteredByTitle : popular;

  const handlePress = (item: any) => {
    dispatch(setSelectedMovie(item));
    navigation.navigate('Media', {
      type: item.name ? 'serie' : 'movie',
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      return;
    }

    if (activeCategory === 'movies') {
      dispatch(fetchMoviesByTitle(debouncedQuery));
    } else if (activeCategory === 'series') {
      dispatch(fetchSeriesByTitle(debouncedQuery));
    }
  }, [debouncedQuery, dispatch, activeCategory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <HeaderBar onBackPress={() => navigation.goBack()} />
      <SearchBar value={query} onChangeText={setQuery} />

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Series y películas recomendadas</Text>

        <View style={styles.recommendedList}>
          {listToShow.map(item => (
            <RecommendedItem key={item.id} item={item} onPress={handlePress} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  recommendedList: {
    paddingHorizontal: 15,
  },
});

export default SearchScreen;
