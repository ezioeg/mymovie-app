import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {X} from 'lucide-react-native';
import {CategoriesOverlayProps} from '../../types/categoryTypes';

const CategoriesOverlay = ({
  visible,
  onClose,
  genres,
  handleGenrePress,
}: CategoriesOverlayProps) => {
  const handleCategoryPress = (genreId: number) => {
    handleGenrePress(genreId);
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      <View style={styles.contentContainer}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.9)"
          barStyle="light-content"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.titleItem} onPress={onClose}>
            <Text style={styles.titleText}>Inicio</Text>
          </TouchableOpacity>

          {genres.map((genre, index) => (
            <TouchableOpacity
              key={genre.id ?? index}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(genre.id)}>
              <Text style={styles.categoryText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  titleItem: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryItem: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
  },
  closeButtonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  closeButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesOverlay;
