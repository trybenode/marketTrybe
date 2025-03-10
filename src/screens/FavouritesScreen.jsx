import React from 'react';
import { SafeAreaView, View } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-2">
      <CustomHeader screenName="Market" title="Favourite Item" />

      <View className="flex-1 px-4">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
