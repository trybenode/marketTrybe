import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '../components/Categories';
import ListingCard from '../components/ListingCard'; // Import your ListingCard component

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Listings (Replace with real data)
  const listings = [
    { id: '1', title: 'Leather Shoes', price: '45.00', image: 'https://via.placeholder.com/150', seller: { name: 'John Doe', avatar: 'https://via.placeholder.com/50' } },
    { id: '2', title: 'Wrist Watch', price: '75.00', image: 'https://via.placeholder.com/150', seller: { name: 'Jane Doe', avatar: 'https://via.placeholder.com/50' } },
    { id: '3', title: 'Backpack', price: '50.00', image: 'https://via.placeholder.com/150', seller: { name: 'Mike Smith', avatar: 'https://via.placeholder.com/50' } },
    { id: '4', title: 'Headphones', price: '120.00', image: 'https://via.placeholder.com/150', seller: { name: 'Alice Brown', avatar: 'https://via.placeholder.com/50' } },
  ];

  return (
    <SafeAreaView className="flex-1">
      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="absolute right-3 top-10 px-2 py-3"
      >
        <View className="h-12 w-12 items-center justify-center rounded-full bg-gray-300">
          <FontAwesome name="user" size={30} color="black" />
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View className="flex-1 px-4">
        {/* Categories */}
        <Categories />

        {/* Search Bar */}
        <View className="my-4 border border-gray-300 rounded-lg px-4 py-2 bg-white">
          <TextInput
            placeholder="Search listings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-base"
          />
        </View>

        {/* Listings - 2 Columns */}
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          numColumns={2} // Ensure two columns
          columnWrapperStyle={{ justifyContent: 'space-between' }} // Add spacing between items
          renderItem={({ item }) => (
            <View className="w-[48%] mb-4">
              <ListingCard {...item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}