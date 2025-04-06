import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestHeader from '../components/TestHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';

export default function ShopScreen({ route }) {
  const navigation = useNavigation({ route });
  const { sellerInfo, sellerProducts = [] } = route.params || {};
  // const sellerProducts = listings.filter((product) => product.userId === sellerInfo.id);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title={sellerInfo.fullName + "'s shop"} extraComponent={<UserProfile />} />
      <ScrollView className="mb-3 flex-col p-3" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <SellerProfileCard
          sellerInfo={sellerInfo}
          name={sellerInfo.fullName || 'Unknown Seller'}
          yearCreated={sellerInfo.yearCreated || 'N/A'}
          location={sellerInfo.address || 'Unknown Location'}
          imageUrl={sellerInfo.imageUrl || 'https://via.placeholder.com/150'}
        />


        {/* Product List displaying Only Seller's Products */}
        {sellerProducts.length > 0 ? (
          <View className="mt-4 flex-row flex-wrap justify-between px-2">
            {sellerProducts.map((product) => (
              <View key={product.id} className="mb-4 w-[48%]">
                <TouchableOpacity
                  onPress={() => navigation.navigate('ListingDetails', { product })}>
                  <ListingCard product={product} btnName="View" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text className="mt-6 text-center text-gray-500">No other products found for {sellerInfo.fullName}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
