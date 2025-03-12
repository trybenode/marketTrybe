import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import Options from '../components/Options';
import { Ionicons } from '@expo/vector-icons';
import TestHeader from '../components/TestHeader';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello!', sender: 'me' },
    { id: '2', text: 'Hi there!', sender: 'them' },
    { id: '3', text: 'How are you?', sender: 'me' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim().length === 0) return;

    const message = { id: Date.now().toString(), text: newMessage, sender: 'me' };
    setMessages([...messages, message]);
    setNewMessage('');
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-2">
     <TestHeader title="Chat" extraComponent={<Options/>}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-gray-100">
        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className={`mx-2 mb-4 ${item.sender === 'me' ? 'items-end' : 'items-start'}`}>
              <View
                className={`max-w-[80%] rounded-2xl p-3 shadow-md ${
                  item.sender === 'me'
                    ? 'self-end rounded-lg bg-blue-500'
                    : 'self-start rounded-lg border border-gray-200 bg-white'
                }`}>
                <Text
                  className={`text-lg ${item.sender === 'me' ? 'text-white' : 'text-gray-900'}`}>
                  {item.text}
                </Text>
              </View>
              <Text className="mt-1 text-xs text-gray-400">{item.timestamp}</Text>
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
          inverted
        />

        {/* Message Input & Send Button */}
        <View className="flex-row items-center border-t border-gray-300 bg-white p-4">
          <TextInput
            className="flex-1 rounded-lg bg-gray-100 p-3"
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity onPress={sendMessage} className="ml-3 rounded-full  bg-blue-500 p-3">
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
