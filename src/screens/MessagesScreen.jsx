import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { messages } from '../data/dummyData';
import { useNavigation } from '@react-navigation/native';
export default function MessagesScreen() {
  const [chats, setChats] = useState(messages);
  const navigation = useNavigation()
  // useEffect(() => {
  //   setChats(messages);
  // }, []);
  // console.log(chats);
  

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <Text className="mb-4 text-2xl font-bold">Messages</Text>
          </View>
        }
        className='p-4 mb-20'
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center border-b border-gray-200 py-4"
            onPress={() =>
              navigation.navigate('ChatScreen', { user: item.user, product: item.product })
            }>
            {/* Product Image */}
            <Image source={{ uri: item.product.image }} className="h-12 w-12 rounded-lg" />

            {/* Chat Details */}
            <View className="ml-4 flex-1">
              <Text className="text-md font-bold">{item.product.name}</Text>
              <Text className="text-gray-500">
                {item.user}: {item.lastMessage}
              </Text>
            </View>

            {/* Timestamp & Unread Indicator */}
            <View className="items-end">
              <Text className="text-gray-400">{item.timestamp}</Text>
              {item.unread && <View className="mt-1 h-3 w-3 rounded-full bg-blue-500" />}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
