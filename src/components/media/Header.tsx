import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeft, Download, Search} from 'lucide-react-native';

const Header = ({onBackPress}: {onBackPress: () => void}) => (
  <SafeAreaView style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
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
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
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
});

export default Header;
