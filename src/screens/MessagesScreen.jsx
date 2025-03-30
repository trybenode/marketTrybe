import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';
import { messages } from '../data/dummyData';
import {getAllConversations} from '../hooks/messaginghooks';

export default function MessagesScreen() {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversations = await getAllConversations(currentUserId);
        setChats(conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (currentUserId) {
      fetchConversations();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserId(user.uid);
      console.log(user.uid);
      return () => unsubscribe();
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <CustomHeader title="Messages" screenName="Market" extraComponent={<UserProfile />} /> */}
      <TestHeader title="Messages" extraComponent={<UserProfile />} />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        className="p-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center border-b border-gray-200 py-5"
            // conversationId,
            // otherUserId: sellerID 
            onPress={() => navigation.navigate('Chat', { conversationId: `${currentUserId}_${item.userId}`, otherUserId: item.userId })}>
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
