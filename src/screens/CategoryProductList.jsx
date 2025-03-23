import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListingCards from '../components/ListingCards';
import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';

function CategoryProductList() {
  const route = useRoute();
  const { categoryID, categoryName, products = [] } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title={categoryName} extraComponent={<UserProfile />} />

      <View className="flex-1 px-4 py-3">
        <ListingCards
          key={categoryID}
          categoryFilter={categoryID}
          initialProducts={products} // Use products if available to prevent re-fetching
          emptyMessage={
            <Text className="mt-4 text-center text-gray-500">
              No products found in {categoryName}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default CategoryProductList;
