import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Categories from '../components/Categories';
import ListingCards from '../components/ListingCards'; //import listing card component
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-3 top-10 px-2 py-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={30} color="black" />
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View className="flex-1 px-4">
        {/* Categories */}
        <Categories />

        {/* Search Bar */}
        <SearchBar />

        {/*Product Listings */}
        <ListingCards />
      </View>
    </SafeAreaView>
  );
}
