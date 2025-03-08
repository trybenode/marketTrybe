import { useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import ListingCards from '../components/ListingCards';
import { categories, listings } from '../data/dummyData';

function CategoryProductList() {
  const route = useRoute();
  const categoryID = route.params?.categoryID;

  // Find category name from categories array catName= CategoryName
  const selectedCategory = categories.find((catName) => catName.id === categoryID)?.name;

  // Filter listings based on category name
  const filteredProducts = selectedCategory
    ? listings.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <SafeAreaView className="flex-1">
      <Text className="py-4 text-center text-xl font-semibold">
        {/* {selectedCategory ? `${selectedCategory} Similar Products` : 'No Category Selected'} */}
        {selectedCategory}
      </Text>

      {/* Checks if filteredProducts is empty and display appropriate UI */}
      {filteredProducts.length > 0 ? (
        <ListingCards key={categoryID} data={filteredProducts} />
      ) : (
        <Text className="mt-5 text-center text-lg">No products found in this category.</Text>
      )}
    </SafeAreaView>
  );
}

export default CategoryProductList;
