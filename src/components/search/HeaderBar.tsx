import {ArrowLeft, Download} from 'lucide-react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HeaderBar = ({onBackPress}: {onBackPress: () => void}) => (
  <SafeAreaView style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <ArrowLeft color="white" size={24} />
    </TouchableOpacity>

    <TouchableOpacity style={styles.downloadButton}>
      <Download color="white" size={22} />
      <View style={styles.notificationDot}>
        <Text style={styles.notificationText}>!</Text>
      </View>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  downloadButton: {
    padding: 5,
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

export default HeaderBar;
