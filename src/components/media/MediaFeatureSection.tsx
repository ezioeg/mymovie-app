import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Play, Plus} from 'lucide-react-native';
import {POSTER_URL} from '../../services/tmdbAPI';
import {FeaturedMediaProps} from '../../types/mediaTypes';

export default function FeaturedMovie({item, onPress}: FeaturedMediaProps) {
  const handlePress = () => {
    const type = item.name ? 'serie' : 'movie';
    onPress?.(item, type);
  };

  return (
    <TouchableOpacity style={styles.featuredContent} onPress={handlePress}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `${POSTER_URL}${item.backdrop_path}`}}
          style={styles.featuredImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.movieInfo}>
        <View style={styles.genreTags}>
          <Text style={styles.genreTag}>Acción</Text>
          <Text style={styles.genreDot}>•</Text>
          <Text style={styles.genreTag}>Drama</Text>
          <Text style={styles.genreDot}>•</Text>
          <Text style={styles.genreTag}>Suspenso</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.playButton}>
            <Play size={22} color="black" />
            <Text style={styles.playButtonText}>Reproducir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myListButton}>
            <Plus size={24} color="white" />
            <Text style={styles.myListButtonText}>Mi lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featuredContent: {
    height: 450,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'black',
    marginHorizontal: 15,
    position: 'relative',
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  genreTags: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  genreTag: {
    color: 'white',
    fontSize: 12,
  },
  genreDot: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  playButton: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
  },
  playButtonText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  myListButton: {
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  myListButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
