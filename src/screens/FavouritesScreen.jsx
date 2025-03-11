import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';
import UserProfile from '../components/UserProfile';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-2">
      <CustomHeader title="Favourites" screenName="Market" extraComponent={<UserProfile />} />
      <View className="flex-1 px-4">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
