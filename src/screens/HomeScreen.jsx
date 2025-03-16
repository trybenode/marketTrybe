import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Categories from '../components/Categories';
import ListingCards from '../components/ListingCards'; 
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';
import { listings } from '../data/dummyData';

export default function HomeScreen() {
  // console.log('Listings Data:', listings);

  return (
    <SafeAreaView className="flex-1 bg-white p-0">
      <View className="flex-row items-center justify-between p-4">
        {/* Header containing Logo and Profile picture */}
        <View>
          <Text className="text-2xl font-extrabold color-black">MARKET TRYBE</Text>
        </View>
        <UserProfile />
      </View>

      {/* Main Content */}
      <View className=" flex-1 px-2">
        {/* Categories */}
        <Categories />

        <SearchBar />

        {/*Product Listings */}
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
