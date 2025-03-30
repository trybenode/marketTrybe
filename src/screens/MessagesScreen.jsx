import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';
import { messages } from '../data/dummyData';
import { getAllConversations } from '../hooks/messaginghooks';

export default function MessagesScreen() {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if (currentUserId) {
      unsubscribe = getAllConversations(currentUserId, setChats);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUserId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserId(user.uid);
      console.log(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const sortedChats = [...chats].sort((a, b) => {
    return (b.lastMessage?.timestamp || 0) - (a.lastMessage?.timestamp || 0);
  });

  const renderItem = ({ item }) => {
    const otherParticipant = item.participants.find(id => id !== currentUserId);
    const hasUnreadMessages = Array.isArray(item.unreadBy) && item.unreadBy.includes(currentUserId);

    return (
      <TouchableOpacity
        className="flex-row items-center border-b border-gray-200 py-5"
        onPress={() => navigation.navigate('Chat', { 
          conversationId: item.id, 
          otherUserId: otherParticipant 
        })}>
        <View className="relative">
          <Image 
            source={{ uri: item.product?.imageUrl }} 
            className="h-12 w-12 rounded-lg" 
          />
          {hasUnreadMessages && (
            <View className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-blue-500" />
          )}
        </View>
        <View className="ml-4 flex-1">
          <Text className={`text-md ${hasUnreadMessages ? 'font-bold' : 'font-normal'}`}>
            {item.product?.name}
          </Text>
          <Text className={`${hasUnreadMessages ? 'text-gray-900' : 'text-gray-500'}`}>
            {item.lastMessage?.text}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-gray-400">
            {new Date(item.lastMessage?.timestamp).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader title="Messages" extraComponent={<UserProfile />} />
      <FlatList
        data={sortedChats}
        keyExtractor={(item) => item.id}
        className="p-4"
        contentContainerStyle={{ paddingBottom: 110 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
