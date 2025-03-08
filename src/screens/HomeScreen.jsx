import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Categories from '../components/Categories';
import ListingCards from '../components/ListingCards'; //import listing card component
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 p-0">
      <View className="flex-row items-center justify-between p-4">
        {/* Header containing Logo and Profile picture */}
        <View>
          <Text className="text-2xl font-extrabold color-black">MARKET TRYBE</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="flex flex-row">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
            <FontAwesome name="user" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-col px-4">
        {/* Categories */}
        <Categories />

        <SearchBar />

        {/*Product Listings */}
        <ListingCards />
      </View>
    </SafeAreaView>
  );
}
