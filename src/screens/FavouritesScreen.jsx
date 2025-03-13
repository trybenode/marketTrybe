import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';
import UserProfile from '../components/UserProfile';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1">
      <CustomHeader title="Favourites" screenName="Market" extraComponent={<UserProfile />} />
      <View className="flex-1 px-3 py-1 pt-1">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
