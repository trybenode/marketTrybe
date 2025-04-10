import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { query, getDocs, collection, orderBy, startAfter, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ListingCards from '../components/ListingCards';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasSearchQuery, setHasSearchQuery] = useState(false);

  const fetchProducts = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setIsFetchingMore(true);
        } else {
          setLoading(true);
        }

        let baseQuery = collection(db, 'products');
        let constructedQuery = query(baseQuery, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

        if (isLoadMore && lastVisible) {
          constructedQuery = query(
            baseQuery,
            orderBy('createdAt', 'desc'),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          );
        }

        const querySnapshot = await getDocs(constructedQuery);
        const newProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          product: {
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          },
        }));

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
        setProducts((prev) => (isLoadMore ? [...prev, ...newProducts] : newProducts));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [lastVisible]
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const productsToDisplay = hasSearchQuery ? filteredProducts : products;

  return (
    <SafeAreaView className="flex-1 bg-white p-0">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-extrabold color-black">MARKET TRYBE</Text>
        <UserProfile />
      </View>

      <View className="flex-1 px-3">
        <Categories />
        <SearchBar
          onResults={(results, isSearchActive) => {
            setFilteredProducts(results);
            setHasSearchQuery(isSearchActive);
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : productsToDisplay.length > 0 ? (
          <ListingCards
            products={productsToDisplay}
            isFetchingMore={isFetchingMore}
            loadMoreProducts={() => {
              if (!hasSearchQuery) fetchProducts(true);
            }}
          />
        ) : (
          <View className="flex-1 items-center">
            <Text className="text-lg text-red-500">
              {hasSearchQuery ? 'No products found' : 'No products available'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
