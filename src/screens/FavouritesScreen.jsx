import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import ListingCards from '../components/ListingCards';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-6">
      <BackButton />
      <Text className="p-2 text-center"> Favourite Item </Text>

      <ListingCards />
    </SafeAreaView>
  );
}
