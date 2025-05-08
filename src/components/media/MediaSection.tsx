import {View, Text, StyleSheet, FlatList} from 'react-native';
import MediaItem from './MediaItem';
import {PopularMediaSectionProps} from '../../types/mediaTypes';

const MovieSection = ({movies, title, onPress}: PopularMediaSectionProps) => {
  const isPopular =
    title === 'Películas Populares' ||
    title === 'Mejor Valoradas' ||
    title === 'Series Populares' ||
    title === 'Series Mejor Valoradas';
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <MediaItem
            item={item}
            index={index}
            showNumber={isPopular}
            onPress={onPress}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          isPopular ? styles.flatListContentContainer : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContentContainer: {paddingLeft: 15},
});

export default MovieSection;
