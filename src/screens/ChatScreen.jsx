import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Options from '../components/Options';
import { addMessageToConversation, getConversationWithID } from '../hooks/messaginghooks';
import TestHeader from '../components/TestHeader';
import { auth } from '../../firebaseConfig';

export default function ChatScreen({ route }) {
  const { conversationId, otherUserId, productDetails } = route.params;
  const [conversation, setConversation] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (conversationId) {
      const unsubscribe = getConversationWithID(conversationId, setConversation);
      return () => unsubscribe();
    }
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUserId) return;

    try {
      const messageObj = {
        senderID: currentUserId,
        text: newMessage,
        timestamp: serverTimestamp(),
      };
      await addMessageToConversation(messageObj, conversationId);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to send message',
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2">
      <TestHeader title="Chat" extraComponent={<Options />} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-100">
        {/* Messages List */}
        <FlatList
          data={conversation?.messages || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className={`mx-2 mb-4 ${item.senderID === currentUserId ? 'items-end' : 'items-start'}`}>
              <View
                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                  item.senderID === currentUserId
                    ? 'self-end rounded-lg bg-blue-500'
                    : 'self-start rounded-lg border border-gray-200 bg-white'
                }`}>
                <Text
                  className={`text-lg ${item.senderID === currentUserId ? 'text-white' : 'text-gray-900'}`}>
                  {item.text}
                </Text>
              </View>
              <Text className="mt-1 text-xs text-gray-400">{item.timestamp}</Text>
            </View>
          )}
          inverted
          contentContainerStyle={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input & Send Button */}
        <View className="flex-row items-center border-t border-gray-300 bg-white p-4">
          <TextInput
            className="flex-1 rounded-lg bg-gray-100 p-3"
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity onPress={sendMessage} className="ml-3 rounded-full bg-blue-500 p-3">
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
