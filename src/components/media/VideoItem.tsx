import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Download, Play} from 'lucide-react-native';
import {POSTER_URL} from '../../services/tmdbAPI';

const VideoItem = ({video, backdropPath}: any) => {
  const youtubeUrl =
    video.site === 'YouTube'
      ? `https://www.youtube.com/watch?v=${video.key}`
      : null;

  const thumbnailUrl =
    video.site === 'YouTube'
      ? `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`
      : POSTER_URL + backdropPath;

  return (
    <View style={styles.episodeItem}>
      <TouchableOpacity
        style={styles.episodeThumbnail}
        onPress={() => youtubeUrl && Linking.openURL(youtubeUrl)}>
        <ImageBackground
          source={{uri: thumbnailUrl}}
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
};

const styles = StyleSheet.create({
  thumbnailImage: {
    width: 120,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
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
});

export default VideoItem;
