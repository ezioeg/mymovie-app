import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {ArrowLeft, Download, Mic, Play, Search} from 'lucide-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  fetchMoviesByTitle,
  setSelectedMovie,
} from '../../redux/slices/moviesSlice';
import {MovieScreenNavigation} from '../../components/MovieItem';
import {POSTER_URL} from '../../services/tmdbAPI';
import {useEffect, useState} from 'react';
import {fetchSeriesByTitle} from '../../redux/slices/seriesSlice';

const SearchScreen = () => {
  const navigation = useNavigation<MovieScreenNavigation>();
  const dispatch = useAppDispatch();
  const route = useRoute();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const moviesState = useAppSelector(state => state.movies);
  const seriesState = useAppSelector(state => state.series);

  const {activeCategory} = route.params as {
    activeCategory: 'movies' | 'series' | 'categories';
  };

  const {popular, filteredByTitle} =
    activeCategory === 'movies' ? moviesState : seriesState;

  const listToShow = query.trim().length > 0 ? filteredByTitle : popular;

  const handlePress = (item: any) => {
    dispatch(setSelectedMovie(item));
    navigation.navigate('Movie');
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

      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton}>
          <Download color="white" size={22} />
          <View style={styles.notificationDot}>
            <Text style={styles.notificationText}>!</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Search color="#999" size={22} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar series o películas"
            placeholderTextColor="#999"
            value={query}
            onChangeText={text => setQuery(text)}
          />
          <TouchableOpacity>
            <Mic color="#999" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Series y películas recomendadas</Text>

        <View style={styles.recommendedList}>
          {listToShow.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.contentItem}
              onPress={() => handlePress(item)}>
              <View style={styles.posterContainer}>
                <Image
                  source={{uri: `${POSTER_URL}${item.poster_path}`}}
                  style={styles.poster}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.contentTitle}>
                  {item.title || item.name}
                </Text>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play color="white" size={20} />
              </TouchableOpacity>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  downloadButton: {
    padding: 5,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e87c03',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 0,
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
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  posterContainer: {
    position: 'relative',
    width: 120,
    height: 70,
    borderRadius: 4,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
