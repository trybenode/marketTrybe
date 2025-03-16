import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from '../components/CustomHeader';
import ListingCard from '../components/ListingCard';
import SellerProfileCard from '../components/SellerProfileCard';
import UserProfile from '../components/UserProfile';
import { listings } from '../data/dummyData'; // Import your product data

export default function ShopScreen() {
  const navigation = useNavigation();


  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader
        screenName="ListingDetails"
        title="Seller's Profile"
        extraComponent={<UserProfile />}
      />
      <ScrollView className="mb-3 flex-col p-3" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <SellerProfileCard
          name="Demilade Femi"
          yearCreated="2025"
          location="Hostelite, Block C, Enterprise"
          imageUrl="https://images.pexels.com/photos/31137621/pexels-photo-31137621.jpeg"
        />

        {/* Shop Title */}
        <Text className="mt-12 text-center text-lg font-semibold">Demilade’s Shop</Text>

        {/* Product List */}
        <View className=" mt-4  flex-row flex-wrap justify-between px-2">
          {listings.map((product) => (
            <View key={product.id} className="mb-4 w-[48%]">
              <TouchableOpacity onPress={() => navigation.navigate('ListingDetails')}>
                <ListingCard {...product} btnName="view" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
