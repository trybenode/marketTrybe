import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import BackButton from '../components/BackButton';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';
import CustomHeader from '../components/CustomHeader';

export default function FavouritesScreen() {
  return (
    <SafeAreaView className="flex-1 p-2">
      <CustomHeader title="Favourites" screenName="Market" />
      {/* <Text className="texl-lg mb-2 py-3 text-center font-semibold"> Favourite Item </Text> */}
      <View className="mt-2 flex-1 px-4">
        <ListingCards data={listings} />
      </View>
    </SafeAreaView>
  );
}
