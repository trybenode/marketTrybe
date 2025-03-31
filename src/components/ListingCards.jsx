import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Alert, Text, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, where, startAfter, limit } from 'firebase/firestore';
import ListingCard from './ListingCard';

const PAGE_SIZE = 10; // Number of products to fetch per page

const ListingCards = memo(({ bottomPad = 100, categoryFilter, products }) => {
  const navigation = useNavigation();
  const [listingFetched, setListingFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchProductListings = useCallback(async (isLoadMore = false) => {
    try {
      if (isLoadMore) setIsFetchingMore(true);
      else setIsLoading(true);
      
      let baseQuery = collection(db, 'products');
      let constructedQuery = query(baseQuery, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

      if (categoryFilter) {
        constructedQuery = query(constructedQuery, where('categoryId', '==', categoryFilter));
      }

      if (isLoadMore && lastVisible) {
        constructedQuery = query(constructedQuery, startAfter(lastVisible));
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

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      
      setListingFetched((prev) => (isLoadMore ? [...prev, ...productListingData] : productListingData));
    } catch (error) {
      setError(error.message);
      Alert.alert('Error', 'An error occurred while fetching product listings.');
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }, [categoryFilter, lastVisible]);

  useEffect(() => {
    fetchProductListings();
  }, [categoryFilter, products]);

  const loadMoreProducts = () => {
    if (!isFetchingMore && lastVisible) {
      fetchProductListings(true);
    }
  };

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
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        columnWrapperStyle={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ListingDetails', {
                product: {
                  ...item.product,
                  createdAt: item.product.createdAt ? item.product.createdAt.toISOString() : null,
                },
                itemId: item.id,
              })
            }
            className="mb-4 w-[48%]">
            <ListingCard product={item.product} btnName="View" />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className="mt-4 text-center text-gray-500">No products found</Text>}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore && <ActivityIndicator size="small" color="#2563eb" />}
      />
    </View>
  );
});

export default ListingCards;
