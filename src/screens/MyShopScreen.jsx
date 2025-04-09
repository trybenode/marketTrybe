import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

// SafeAreaView to respect notches/status bar areas
import { SafeAreaView } from 'react-native-safe-area-context';

// Firebase auth and firestore
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

import CustomHeader from '../components/CustomHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function MyShopScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Controls overall loading spinner
  const [refreshing, setRefreshing] = useState(false); // Controls pull-to-refresh indicator
  const [userProfile, setUserProfile] = useState(null); // Holds current user's profile data
  const [userProducts, setUserProducts] = useState([]);

  const currentUser = auth.currentUser;

  const hasProduct = userProducts.length > 0;

  // Fetch user profile from Firestore
  const fetchUserProfile = async () => {
    try {
      if (currentUser) {
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('userId', '==', currentUser.uid))
        );
        if (!userDoc.empty) {
          setUserProfile(userDoc.docs[0].data());
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Fetch products uploaded by the current user
  const fetchUserProducts = async () => {
    try {
      if (currentUser) {
        const productQuery = query(
          collection(db, 'products'),
          where('userId', '==', currentUser.uid)
        );
        const productDocs = await getDocs(productQuery);
        const products = productDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserProducts(products);
      }
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };

  // Fetch both profile and product data
  const fetchData = async () => {
    await fetchUserProfile();
    await fetchUserProducts();
    setLoading(false);
    setRefreshing(false);
  };

  // Run fetchData once when screen loads or currentUser changes
  useEffect(() => {
    fetchData();
  }, [currentUser]);

  // Handle pull-to-refresh gesture
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />

      <View className="flex-1 pb-20">
        {hasProduct ? (
          <FlatList
            data={userProducts}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              // Pull to refresh control
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2563eb']}
                tintColor="#2563eb"
              />
            }
            ListHeaderComponent={
              // Seller profile displayed above product list
              <View className="mb-4">
                <SellerProfileCard />
              </View>
            }
            renderItem={({ item }) => (
              <View className="mb-4 w-[48%]">
                <TouchableOpacity onPress={() => navigation.navigate('Sell', { product: item })}>
                  <ListingCard product={item} btnName="Edit" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-6">
            <Text className="text-center text-lg text-gray-500">
              You haven't uploaded any products yet.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sell')}
              className="mt-4 rounded-lg bg-blue-500 px-6 py-2">
              <Text className="text-center text-white">Add New Product</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
