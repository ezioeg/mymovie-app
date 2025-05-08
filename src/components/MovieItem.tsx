import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/store';
import {setSelectedMovie} from '../redux/slices/moviesSlice';
import {setSelectedSerie} from '../redux/slices/seriesSlice';
import {POSTER_URL} from '../services/tmdbAPI';

export type MovieScreenNavigation = NativeStackNavigationProp<
  {Movie: {type: 'movie' | 'serie'} | undefined},
  'Movie'
>;

interface MovieItemProps {
  item: any;
  index?: number;
  showNumber?: boolean;
}

function MovieItem({item, index, showNumber = false}: MovieItemProps) {
  const navigation = useNavigation<MovieScreenNavigation>();
  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (item.name) {
      dispatch(setSelectedSerie(item));
    } else if (item.title) {
      dispatch(setSelectedMovie(item));
    }
    navigation.navigate('Movie', {type: item.name ? 'serie' : 'movie'});
  };

  const renderNumberWithOutline = (num: number) => {
    return (
      <View style={styles.rankNumberContainer}>
        <Text style={styles.rankNumberOutline}>{num}</Text>
        <Text style={styles.rankNumberHollow}>{num}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={showNumber ? styles.cardWithNumber : styles.card}>
      {showNumber && index !== undefined && renderNumberWithOutline(index + 1)}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: `${POSTER_URL}${item.poster_path}`}}
          style={styles.image}
        />
        {showNumber && Math.random() > 0.7 && (
          <View style={styles.recentBadge}>
            <Text style={styles.recentText}>Recién agregado</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginRight: 10,
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardWithNumber: {
    position: 'relative',
    marginRight: 20,
    width: 155,
    height: 180,
    borderRadius: 8,
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rankNumberContainer: {
    position: 'absolute',
    left: -10,
    zIndex: 0,
  },
  rankNumberOutline: {
    fontSize: 150,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    fontFamily: 'Arial',
    lineHeight: 150,
    textShadowColor: 'white',
    textShadowRadius: 4,
    textShadowOffset: {width: 0, height: 0},
  },
  rankNumberHollow: {
    fontSize: 150,
    fontWeight: 'bold',
    color: 'rgba(10, 12, 23, 0.8)',
    fontFamily: 'Arial',
    lineHeight: 150,
  },
  recentBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    paddingVertical: 3,
  },
  recentText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MovieItem;
