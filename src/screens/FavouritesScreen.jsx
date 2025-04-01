import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListingCards from '../components/ListingCards';
import UserProfile from '../components/UserProfile';
import { listings } from '../data/dummyData';
import TestHeader from '../components/TestHeader';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="Favourites" screenName="Market" extraComponent={<UserProfile />} />
      <View className="flex-1 px-3 pt-1">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
