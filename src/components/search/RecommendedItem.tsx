import {Play} from 'lucide-react-native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {POSTER_URL} from '../../services/tmdbAPI';
import {Media} from '../../types/mediaTypes';

const RecommendedItem = ({
  item,
  onPress,
}: {
  item: Media;
  onPress: (item: Media) => void;
}) => (
  <TouchableOpacity style={styles.contentItem} onPress={() => onPress(item)}>
    <View style={styles.posterContainer}>
      <Image
        source={{uri: `${POSTER_URL}${item.poster_path}`}}
        style={styles.poster}
      />
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.contentTitle}>{item.title || item.name}</Text>
    </View>
    <TouchableOpacity style={styles.playButton}>
      <Play color="white" size={20} />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default RecommendedItem;
