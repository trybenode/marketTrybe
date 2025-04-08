import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import TestHeader from '../components/TestHeader';
import UserProfile from '../components/UserProfile';
// import { messages } from '../data/dummyData';
import { getAllConversations } from '../hooks/messaginghooks';

export default function MessagesScreen() {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getAllConversations(currentUserId, setChats);
    } catch (error) {
      console.error('Error refreshing conversations:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let unsubscribeListener = null;

    if (currentUserId) {
      getAllConversations(currentUserId, setChats)
        .then((unsubscribe) => {
          unsubscribeListener = unsubscribe;
        })
        .catch((error) => {
          console.error('Error setting up conversation listener:', error);
        });
    }

    return () => {
      if (unsubscribeListener) {
        unsubscribeListener();
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

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(parseInt(timestamp));
    const now = new Date();

    // If message is from today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If message is from this week, show day name
    if (now - date < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const handleNavigate = async (item) => {
    try {
      const productRef = doc(db, 'products', item.product.id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        navigation.navigate('ListingDetails', {
          product: {
            ...productData,
            id: productSnap.id,
            createdAt:
              productData.createdAt?.toDate?.() instanceof Date
                ? productData.createdAt.toDate().toISOString()
                : null,
          },
          itemId: productSnap.id,
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const renderItem = ({ item }) => {
    const otherParticipant = item.participants.find((id) => id !== currentUserId);
    const hasUnreadMessages = Array.isArray(item.unreadBy) && item.unreadBy.includes(currentUserId);

    return (
      <TouchableOpacity
        className="flex-row items-center border-b border-gray-200 py-5"
        onPress={() =>
          navigation.navigate('Chat', {
            conversationId: item.id,
            otherUserId: otherParticipant,
          })
        }>
        <View className="relative">
          <TouchableOpacity onPress={() => handleNavigate(item)}>
            <Image source={{ uri: item.product?.imageUrl }} className="h-12 w-12 rounded-lg" />
          </TouchableOpacity>
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
          <Text className="text-gray-400">{formatTimestamp(item.lastMessage?.timestamp)}</Text>
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
      />
    </SafeAreaView>
  );
}
