import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomHeader from '../components/CustomHeader';
import SellerProfileCard from '../components/SellerProfileCard';
import ListingCard from '../components/ListingCard';

import { useNavigation } from '@react-navigation/native';
import { listings } from '../data/dummyData'; // Import your product data
import UserProfile from '../components/UserProfile';

export default function MyShopScreen() {
  const navigation = useNavigation();

  //   const [isSeller, setIsSeller] = useState(false);
  const hasProducts = listings.length > 0;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <CustomHeader screenName="Profile" title="MyShop" extraComponent={<UserProfile />} />
      <ScrollView showsVerticalScrollIndicator={false} className="mb-20 flex-1 p-3 pb-20">
        {hasProducts ? (
          <>
            <SellerProfileCard
              name="Moradeyo Abdullah"
              yearCreated="2025"
              location="Room 120 Independence, Boy's Hostel"
              imageUrl="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
            />
            <View className=" mt-4  flex-row flex-wrap justify-between px-2">
              {listings.map((product) => (
                <View key={product.id} className="mb-4 w-[48%]">
                  <TouchableOpacity onPress={() => navigation.navigate('Sell')}>
                    <ListingCard {...product} btnName="Edit" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View className=" flex-1 items-center  justify-center  px-4 ">
            <Text className="text-center text-lg text-red-600">
              You haven't uploaded any products yet.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sell')} // No product for uploading
              className="mt-4 rounded-lg bg-blue-500 px-6 py-2">
              <Text className="text-center text-white">Click here to get started</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
