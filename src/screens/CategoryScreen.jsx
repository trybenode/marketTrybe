import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../components/BackButton';
import CategoriesListing from '../components/CategoriesListing';
import { categories } from '../data/dummyData';
import CustomHeader from '../components/CustomHeader';

export default function CategoryScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 p-3">
      <CustomHeader screenName="MainTabs" title="All Available Category" />

      <FlatList
        data={categories}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
        keyExtractor={(item) => item.id}
        className="mb-2 p-2"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductList', { category: item.name })}>
            <CategoriesListing {...item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
