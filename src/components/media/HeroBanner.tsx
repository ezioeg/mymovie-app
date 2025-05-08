import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Play} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const HeroBanner = ({imageUrl, title, type, onPress}: any) => (
  <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
    <ImageBackground source={{uri: imageUrl}} style={styles.heroImage}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
        style={styles.gradient}
      />
      <View style={styles.heroContent}>
        <Text style={styles.seriesType}>{type}</Text>
        <Text style={styles.seriesTitle}>{title}</Text>
      </View>
      <View style={styles.playButtonOverlay}>
        <Play color="white" size={40} />
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default HeroBanner;
