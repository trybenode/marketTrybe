import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

import CustomHeader from '../components/CustomHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function MyShopScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const currentUser = auth.currentUser;
  const hasProduct = userProducts.length > 0;

  useEffect(() => {
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

    const fetchData = async () => {
      await fetchUserProfile();
      await fetchUserProducts();
      setLoading(false);
    };
    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />

      <View className="flex-1 p-3 pb-20">
        {hasProduct ? (
          <>
            <SellerProfileCard
              name={userProfile?.displayName || "Wilson's Shop"}
              yearCreated={
                userProfile?.metadata?.creationTime
                  ? new Date(userProfile.metadata.creationTime).getFullYear()
                  : 2025
              }
              location={userProfile?.location || 'Old Admins Block'}
              imageUrl={userProfile?.photoURL || 'https://via.placeholder.com/150'}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mt-4 flex flex-row flex-wrap justify-between">
                {userProducts.map(( product ) => (
                  <View key={product.id} className="mb-4 w-[48%]">
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Sell', { product})}>
                      <ListingCard product={product} btnName="Edit" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
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
