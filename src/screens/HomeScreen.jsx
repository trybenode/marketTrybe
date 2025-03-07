import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { View, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Categories from '../components/Categories';
import ListingCards from '../components/ListingCards'; //import listing card component
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Listings (Replace with real data)
  const listings = [
    {
      id: '1',
      title: 'Leather Shoes',
      price: '45.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'John Doe', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '2',
      title: 'Wrist Watch',
      price: '75.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Jane Doe', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '3',
      title: 'Backpack',
      price: '50.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Mike Smith', avatar: 'https://via.placeholder.com/50' },
    },
    {
      id: '4',
      title: 'Headphones',
      price: '120.00',
      image: 'https://via.placeholder.com/150',
      seller: { name: 'Alice Brown', avatar: 'https://via.placeholder.com/50' },
    },
  ];

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

