import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import BackButton from '../components/BackButton';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-6">
      <BackButton />
      <Text className="texl-xl py-4 text-center font-semibold"> Favourite Item </Text>

      <ListingCards data={listings} />
    </SafeAreaView>
  );
}
