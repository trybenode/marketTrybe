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
    <SafeAreaView className="flex-1">
      {/* Profile Button */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-3 top-10 px-2 py-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={30} color="black" />
        </View>
      </TouchableOpacity> */}
      <View className="flex-row items-center justify-between p-4">
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
      <View className="flex-1 px-4">
        {/* Categories */}
        <Categories />

        {/* Search Bar */}

        {/* <View className="my-4 rounded-lg border border-gray-300 bg-white px-4 py-2">
          <TextInput
            placeholder="Search listings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-base"
          />
        </View> */}

        {/* Listings - 2 Columns */}
        {/* <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          numColumns={2} // Ensure two columns
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Add spacing between items
          renderItem={({ item }) => (
            <View className="mb-4 w-[48%]">
              <ListingCard {...item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        /> */}

        <SearchBar />

        {/*Product Listings */}
        <ListingCards />
      </View>
    </SafeAreaView>
  );
}

/* <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-3 top-10 px-2 py-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={30} color="black" />
        </View>
      </TouchableOpacity> */
