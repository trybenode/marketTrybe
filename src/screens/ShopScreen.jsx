import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, Image } from 'react-native';
import ListingCard from '../components/ListingCard';
import UserProfile from '../components/UserProfile';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { listings } from '../data/dummyData'; // Import your product data

import CustomHeader from '../components/CustomHeader';
import SellerProfileCard from '../components/SellerProfileCard';

export default function ShopScreen() {
  const navigation = useNavigation();
  // const screenHeight = Dimensions.get('window');

  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <CustomHeader
        screenName="ListingDetails"
        title="Seller's Profile"
        extraComponent={<UserProfile />}
      />
      <ScrollView className="mb-3 flex-col" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <SellerProfileCard
          name="Demilade Femi"
          yearCreated="2025"
          location="Hostelite, Block C, Enterprise"
          imageUrl="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        />

        {/* Shop Title */}
        <Text className="mt-4 text-center text-lg font-semibold">Demilade’s Shop</Text>

        {/* Product List */}
        <View className=" mt-4  flex-row flex-wrap justify-between px-2">
          {/* Add mb-20 to the class name here */}
          {listings.map((product) => (
            <View key={product.id} className="mb-4 w-[48%]">
              <TouchableOpacity onPress={() => navigation.navigate('ListingDetails')}>
                <ListingCard {...product} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
