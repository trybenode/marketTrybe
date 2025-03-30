import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

import ListingCard from './ListingCard';

const ListingCards = memo(({ buttomPad = 100, categoryFilter, products }) => {
  const navigation = useNavigation();
  const [listingFetched, setListingFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // uses products directly if already passed 
    if (products && products.length > 0) {
      setListingFetched(products.map((product) => ({ id: product.id, product })));
      setIsLoading(false);
      return;
    }
 //fetch from Firestore
    const fetchProductListings = async () => {
      try {
        let baseQuery = collection(db, 'products');
        let constructedQuery = query(baseQuery, orderBy('createdAt', 'desc'));

        if (categoryFilter) {
          constructedQuery = query(
            constructedQuery,
            where('categoryId', '==', categoryFilter) // ✅ Use categoryName directly for query
          );
        }

        const querySnapshot = await getDocs(constructedQuery);
        const productListingData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          product: {
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          },
        }));

        setListingFetched(productListingData);
      } catch (error) {
        setError(error.message);
        Alert.alert('Error', 'An error occurred while fetching product listings.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductListings();
  }, [categoryFilter, products]); // ✅ Re-run when `products` changes

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginBottom: 50, paddingHorizontal: 3 }}>
      <FlatList
        data={listingFetched}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ListingDetails', {
                product: {
                  ...item.product,
                  createdAt: item.product.createdAt
                    ? item.product.createdAt.toISOString()
                    : null,
                },
                itemId: item.id,
              })
            }
            className="mb-4 w-[48%]"
          >
            <ListingCard product={item.product} btnName="View" />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="mt-4 text-center text-gray-500">No products found</Text>
        }
      />
    </View>
  );
});
export default ListingCards;
