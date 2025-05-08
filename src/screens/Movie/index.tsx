'use client';

import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Linking,
} from 'react-native';
import {
  ArrowLeft,
  Download,
  Search,
  Info,
  Play,
  Plus,
  ThumbsUp,
  Share,
} from 'lucide-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {POSTER_URL} from '../../services/tmdbAPI';
import {
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  setSelectedMovie,
} from '../../redux/slices/moviesSlice';
import {
  fetchSerieCredits,
  fetchSerieVideos,
  fetchSimilarSeries,
  setSelectedSerie,
} from '../../redux/slices/seriesSlice';
import {MovieScreenNavigation} from '../../components/MovieItem';

const {width} = Dimensions.get('window');

// Tabs para la sección inferior
const tabs = ['Tráileres y más', 'Más títulos similares'];

const Movie = () => {
  const navigation = useNavigation<MovieScreenNavigation>();
  const [activeTab, setActiveTab] = useState(0);
  const [showEpisodes, setShowEpisodes] = useState(false);

  const route = useRoute();
  const {type} = route.params as {type: 'movie' | 'serie'};

  const dispatch = useAppDispatch();
  const selectedMovie = useAppSelector(state => state.movies.selectedMovie);
  const selectedSerie = useAppSelector(state => state.series.selectedSerie);
  const movieVideos = useAppSelector(state => state.movies.videos);
  const serieVideos = useAppSelector(state => state.series.videos);
  const similarMovies = useAppSelector(state => state.movies.similarMovies);
  const similarSeries = useAppSelector(state => state.series.similarSeries);
  const credits = useAppSelector(state =>
    type === 'movie' ? state.movies.credits : state.series.credits,
  );
  const videoTrailer = type === 'movie' ? movieVideos : serieVideos;
  const firstVideoKey = videoTrailer?.[0]?.key;

  const firstThreeCast =
    credits?.cast
      ?.slice(0, 3)
      .map((actor: any) => actor.name)
      .join(', ') || 'Sin información';
  const firstCrew =
    credits?.crew?.find((person: any) => person.job === 'Director')?.name ||
    'Sin información';

  const selectedItem = type === 'movie' ? selectedMovie : selectedSerie;

  console.log('Selected item:', selectedItem);

  const toggleView = () => {
    setShowEpisodes(!showEpisodes);
  };

  useEffect(() => {
    if (!selectedItem?.id) {
      return;
    }

    if (type === 'movie') {
      dispatch(fetchMovieCredits(selectedItem.id));
      dispatch(fetchMovieVideos(selectedItem.id));
      dispatch(fetchSimilarMovies(selectedItem.id));
    } else if (type === 'serie') {
      dispatch(fetchSerieCredits(selectedItem.id));
      dispatch(fetchSerieVideos(selectedItem.id));
      dispatch(fetchSimilarSeries(selectedItem.id));
    }
  }, [dispatch, selectedItem, type]);

  const renderTabContent = () => {
    if (activeTab === 0) {
      const videos = type === 'movie' ? movieVideos : serieVideos;

      return (
        <>
          <View style={styles.episodesHeader}>
            <Text style={styles.episodesTitle}>
              {selectedItem.title || selectedItem.name}
            </Text>
          </View>

          {videos.map(video => {
            const youtubeUrl =
              video.site === 'YouTube'
                ? `https://www.youtube.com/watch?v=${video.key}`
                : null;

            return (
              <View key={video.id} style={styles.episodeItem}>
                <TouchableOpacity
                  style={styles.episodeThumbnail}
                  onPress={() => {
                    if (youtubeUrl) {
                      Linking.openURL(youtubeUrl);
                    }
                  }}>
                  <ImageBackground
                    source={{uri: POSTER_URL + selectedItem.backdrop_path}}
                    style={styles.thumbnailImage}>
                    <View style={styles.playIconContainer}>
                      <Play color="white" size={24} />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <View style={styles.episodeInfo}>
                  <View style={styles.episodeTitle}>
                    <Text style={styles.episodeNumber}>{video.name}</Text>
                  </View>
                  <Text style={styles.episodeDescription}>
                    Video oficial de tipo {video.type}
                  </Text>
                </View>

                <TouchableOpacity style={styles.downloadButton}>
                  <Download color="white" size={24} />
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      );
    } else if (activeTab === 1) {
      const similars = type === 'movie' ? similarMovies : similarSeries;

      return (
        <View style={{}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingHorizontal: 15}}>
            {similars.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.similarItem}
                onPress={() => {
                  dispatch(
                    type === 'movie'
                      ? setSelectedMovie(item)
                      : setSelectedSerie(item),
                  );
                  navigation.navigate('Movie', {type});
                }}>
                <Image
                  source={{uri: POSTER_URL + item.poster_path}}
                  style={styles.similarImage}
                />
                <Text style={styles.similarName} numberOfLines={2}>
                  {item.title || item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Download color="white" size={22} />
            <View style={styles.notificationDot}>
              <Text style={styles.notificationText}>!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Search color="white" size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scrollView}>
        {/* Hero Image */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            if (firstVideoKey) {
              Linking.openURL(
                `https://www.youtube.com/watch?v=${firstVideoKey}`,
              );
            }
          }}>
          <ImageBackground
            source={{uri: POSTER_URL + selectedItem.backdrop_path}}
            style={styles.heroImage}>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
              style={styles.gradient}
            />
            <View style={styles.heroContent}>
              <Text style={styles.seriesType}>{type}</Text>
              <Text style={styles.seriesTitle}>
                {selectedItem.title || selectedItem.name}
              </Text>
            </View>
            <View style={styles.playButtonOverlay}>
              <Play color="white" size={40} />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Info Bar */}
        <View style={styles.infoBar}>
          <Text style={styles.infoText}>
            {selectedItem.release_date?.slice(0, 4) ||
              selectedItem.first_air_date?.slice(0, 4)}
          </Text>
          <Text style={styles.infoTag}>{selectedItem.vote_average}</Text>
          <Text style={styles.infoText}>
            {movieVideos.length || serieVideos.length} episodios
          </Text>
          <Text style={styles.infoTag}>HDR</Text>
          <Text style={styles.infoTag}>Audio Espacial</Text>
          <Text style={styles.infoTag}>AD</Text>
        </View>

        {/* Top 10 Badge */}
        <View style={styles.rankingContainer}>
          <View style={styles.top10Badge}>
            <Text style={styles.top10Text}>TOP 10</Text>
          </View>
          <Text style={styles.rankingText}>N.º 1 en TV hoy</Text>
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={toggleView}>
          <Play color="black" size={24} />
          <Text style={styles.playButtonText}>Ver</Text>
        </TouchableOpacity>

        {/* Downloaded Episode */}
        <TouchableOpacity style={styles.downloadedButton} onPress={toggleView}>
          <Download color="white" size={20} />
          <Text style={styles.downloadedText}>Descargar</Text>
        </TouchableOpacity>

        {/* Description */}
        <Text style={styles.description}>{selectedItem.overview}</Text>

        {/* Cast and Creator */}
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsLabel}>Protagonistas: </Text>
          <Text style={styles.creditsText}>{firstThreeCast} </Text>
        </View>

        <View style={styles.creditsContainer}>
          <Text style={styles.creditsLabel}>Creado por: </Text>
          <Text style={styles.creditsText}>{firstCrew}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Plus color="white" size={24} />
            <Text style={styles.actionText}>Mi lista</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <ThumbsUp color="white" size={24} />
            <Text style={styles.actionText}>Calificar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share color="white" size={24} />
            <Text style={styles.actionText}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Download color="white" size={24} />
            <Text style={styles.actionText}>
              Descargar {movieVideos.length || serieVideos.length}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tab, activeTab === index && styles.activeTab]}
                onPress={() => {
                  setActiveTab(index);
                  if (index === 0) {
                    toggleView();
                  }
                }}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.tabIndicator}>
            <View
              style={[
                styles.indicator,
                {
                  left: `${(100 / tabs.length) * activeTab}%`,
                  width: `${100 / tabs.length}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={{marginTop: 16}}>{renderTabContent()}</View>
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
    paddingTop: 40, // Para compensar el StatusBar translúcido
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailImage: {
    width: 120,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  backButton: {
    padding: 5,
  },
  iconButton: {
    padding: 5,
    marginLeft: 15,
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
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  heroContent: {
    padding: 15,
    paddingBottom: 20,
  },
  seriesType: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  seriesTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
  infoTag: {
    color: 'white',
    fontSize: 12,
    backgroundColor: '#333',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },

  rankingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  top10Badge: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  top10Text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rankingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  playButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  downloadedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    marginHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  downloadedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  description: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  creditsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  creditsLabel: {
    color: '#999',
    fontSize: 14,
  },
  creditsText: {
    color: 'white',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: width / 4 - 15,
  },
  actionText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  tabsContainer: {},
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tab: {
    paddingVertical: 15,
    width: `${100 / tabs.length}%`,
    alignItems: 'center',
  },
  activeTab: {},
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#333',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'red',
  },
  episodesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  episodesTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  episodeItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  episodeThumbnail: {
    width: 120,
    height: 70,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  episodeImage: {
    width: '100%',
    height: '100%',
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  episodeInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  episodeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  episodeNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  episodeDescription: {
    color: '#ccc',
    fontSize: 12,
    lineHeight: 18,
  },
  downloadButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  similarItem: {
    marginRight: 12,
    width: 120,
    alignItems: 'center',
  },
  similarImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 6,
  },
  similarName: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Movie;
