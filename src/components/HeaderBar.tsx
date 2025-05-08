import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Cast, Download, Search} from 'lucide-react-native';

interface HeaderBarProps {
  onSearchPress: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({onSearchPress}) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/icons/netflix-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Cast size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Download size={22} color="white" />
          <View style={styles.notificationDot}>
            <Text style={styles.notificationText}>!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
          <Search size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
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
