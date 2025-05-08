import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TabBar = ({tabs, activeTab, onTabPress}: any) => (
  <View style={styles.tabsContainer}>
    <View style={styles.tabs}>
      {tabs.map((tab: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => onTabPress(index)}>
          <Text
            style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.tabIndicator}>
      <View
        style={[
          styles.indicator,
          {
            left: `${(100 / tabs.length) * activeTab}%`,
            width: `${100 / tabs.length}%`,
          },
        ]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabsContainer: {},
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  tab: {
    paddingVertical: 15,
    width: `${100 / 2}%`,
    alignItems: 'center',
  },
  activeTab: {},
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabIndicator: {
    height: 2,
    backgroundColor: '#333',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'red',
  },
});

export default TabBar;
