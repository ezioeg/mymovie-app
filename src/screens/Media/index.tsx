'use client';

import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Linking,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Download, Play, Plus, ThumbsUp, Share} from 'lucide-react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
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
import {POSTER_URL} from '../../services/tmdbAPI';
import {MediaScreenNavigation} from '../../types/mediaTypes';
import Header from '../../components/media/Header';
import VideoItem from '../../components/media/VideoItem';
import SimilarItem from '../../components/media/SimilarItem';
import TabBar from '../../components/media/TabBar';
import HeroBanner from '../../components/media/HeroBanner';

const {width} = Dimensions.get('window');
const tabs = ['Tráileres y más', 'Más títulos similares'];

const MediaScreen = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<MediaScreenNavigation>();

  const [activeTab, setActiveTab] = useState(0);
  const [showEpisodes, setShowEpisodes] = useState(false);

  const {type} = route.params as {type: 'movie' | 'serie'};

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
            return (
              <VideoItem
                key={video.id}
                video={video}
                backdropPath={selectedItem.backdrop_path}
              />
            );
          })}
        </>
      );
    } else if (activeTab === 1) {
      const similars = type === 'movie' ? similarMovies : similarSeries;

      return (
        <View style={styles.renderTabContentContainer}>
          <FlatList
            data={similars}
            numColumns={3}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={({item}: any) => (
              <SimilarItem
                item={item}
                onPress={() => {
                  dispatch(
                    type === 'movie'
                      ? setSelectedMovie(item)
                      : setSelectedSerie(item),
                  );
                  navigation.navigate('Media', {type});
                }}
              />
            )}
          />
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

      <Header onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView}>
        <HeroBanner
          imageUrl={POSTER_URL + selectedItem.backdrop_path}
          title={selectedItem.title || selectedItem.name}
          type={type}
          onPress={() => {
            if (firstVideoKey) {
              Linking.openURL(
                `https://www.youtube.com/watch?v=${firstVideoKey}`,
              );
            }
          }}
        />

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

        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(index: any) => {
            setActiveTab(index);
            if (index === 0) {
              toggleView();
            }
          }}
        />

        <View style={styles.renderTabContentContainer}>
          {renderTabContent()}
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
  thumbnailImage: {
    width: 120,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
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
  renderTabContentContainer: {marginTop: 16},
  renderTabContent: {paddingHorizontal: 15},
  gridContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  columnWrapperStyle: {justifyContent: 'space-between'},
});

export default MediaScreen;
