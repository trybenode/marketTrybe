import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import TestHeader from '../components/TestHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function ShopScreen({ route }) {
  const navigation = useNavigation();
  const { sellerInfo, sellerProducts: initialProducts = [] } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [products, setProducts] = useState(initialProducts);

  // fetch seller's product immediately the screen loads
  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (!initialProducts.length && sellerInfo?.uid) {
        try {
          const fetchedProducts = await fetchSellerProducts(sellerInfo.uid);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error('Initial fetch failed:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInitialProducts();
  }, [sellerInfo?.uid]);

  useEffect(() => {
    console.log('ShopScreen route params:', route.params);
    if (!route.params?.sellerInfo) {
      console.warn('No sellerInfo in route params');
    }
  }, [route.params]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (!sellerInfo) {
        console.warn('No sellerInfo object found');
        return;
      }

      const sellerId = sellerInfo.uid;
      if (!sellerId) {
        console.warn('No seller ID found in sellerInfo:', sellerInfo);
        return;
      }

      const freshProducts = await fetchSellerProducts(sellerId);
      setProducts(freshProducts);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchSellerProducts = async (sellerId) => {
    try {
      if (!sellerId) {
        console.warn('No sellerId provided');
        // Alert.alert('Error', 'Cannot fetch products - missing seller ID');
        return [];
      }

      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('userId', '==', sellerId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to refresh products. Please try again later.', [{ text: 'OK' }]);
      return [];
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader
        title={sellerInfo?.fullName ? `${sellerInfo.fullName}'s shop` : 'Seller Shop'}
        extraComponent={<UserProfile />}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          className="mb-3 px-1"
          contentContainerStyle={{ padding: 12 }}
          data={products}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className="mb-4">
              <SellerProfileCard
                sellerInfo={sellerInfo}
                name={sellerInfo?.fullName || 'Unknown Seller'}
                yearCreated={sellerInfo?.yearCreated || 'N/A'}
                location={sellerInfo?.address || 'Unknown Location'}
                imageUrl={sellerInfo?.imageUrl || 'https://via.placeholder.com/150'}
              />
            </View>
          }
          renderItem={({ item: product }) => (
            <View className="mb-4 w-[48%]">
              <TouchableOpacity
                onPress={() => {
                  if (product)
                    navigation.navigate('ListingDetails', { product, itemId: product.id });
                }}>
                <ListingCard product={product} btnName="View" />
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text className="mt-6 text-center text-gray-500">
              No other products found for {sellerInfo?.fullName || 'this seller'}
            </Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2563eb']}
              tintColor="#2563eb"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
