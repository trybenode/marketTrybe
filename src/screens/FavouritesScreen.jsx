import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import BackButton from '../components/BackButton';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="mt-8 py-2">
        <BackButton screenName="Market" />
      </View>
      <Text className="texl-lg mb-2 py-3 text-center font-semibold"> Favourite Item </Text>
      <View className="flex-1 px-4">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
