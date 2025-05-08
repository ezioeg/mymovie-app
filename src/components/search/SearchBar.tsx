import {Mic, Search} from 'lucide-react-native';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

const SearchBar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <View style={styles.searchBarContainer}>
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <Search color="#999" size={22} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar series o películas"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity>
        <Mic color="#999" size={22} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 0,
  },
});

export default SearchBar;
