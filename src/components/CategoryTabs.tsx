import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ChevronDown} from 'lucide-react-native';

interface CategoryTab {
  label: string;
  value: 'movies' | 'series' | 'categories';
  hasIcon?: boolean;
}

interface CategoryTabsProps {
  tabs: CategoryTab[];
  activeCategory: 'movies' | 'series' | 'categories';
  onTabPress: (value: 'movies' | 'series' | 'categories') => void;
  handleCategoriesPress: () => void;
}

const CategoryTabs = ({
  tabs,
  activeCategory,
  onTabPress,
  handleCategoriesPress,
}: CategoryTabsProps) => {
  return (
    <View style={styles.categoryTabs}>
      {tabs.map((tab, index) => {
        const isActive = tab.value === activeCategory;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryTab,
              isActive && styles.activeCategoryTab,
              tab.hasIcon && styles.categoryTabWithIcon,
            ]}
            onPress={() =>
              tab.value === 'categories'
                ? handleCategoriesPress()
                : onTabPress(tab.value)
            }>
            <Text style={styles.categoryText}>{tab.label}</Text>
            {tab.hasIcon && <ChevronDown size={20} color="white" />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  categoryTab: {
    borderWidth: 1,
    borderColor: '#ffffff50',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTabWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  categoryTabActive: {
    paddingRight: 10,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  activeCategoryTab: {
    backgroundColor: '#E50914',
  },
});

export default CategoryTabs;
