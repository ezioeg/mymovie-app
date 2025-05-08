import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {POSTER_URL} from '../../services/tmdbAPI';
const {width} = Dimensions.get('window');

const SimilarItem = ({item, onPress}: any) => (
  <TouchableOpacity style={styles.similarItem} onPress={() => onPress(item)}>
    <Image
      source={{uri: POSTER_URL + item.poster_path}}
      style={styles.similarImage}
    />
    <Text style={styles.similarName} numberOfLines={2}>
      {item.title || item.name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  similarItem: {
    width: (width - 60) / 3,
    alignItems: 'center',
    justifyContent: 'center',
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

export default SimilarItem;
