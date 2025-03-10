import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';

export default function MessagesScreen() {
  const [chats, setChats] = useState();
  useEffect(() => {
    setChats(messages);
  }, []);
  // console.log(chats);
  const messages = [
    {
      id: '1',
      product: {
        name: 'iPhone 12',
        image:
          'https://images.pexels.com/photos/28771662/pexels-photo-28771662/free-photo-of-vintage-electronics-and-media-shelf-display.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'John Doe',
      lastMessage: 'Hey, is this still available?',
      timestamp: '2:30 PM',
      unread: true,
    },
    {
      id: '2',
      product: {
        name: 'MacBook Pro',
        image:
          'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Jane Smith',
      lastMessage: 'Can you do a discount?',
      timestamp: '1:15 PM',
      unread: false,
    },
    {
      id: '3',
      product: {
        name: 'Nike Air Force 1',
        image:
          'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Mike Johnson',
      lastMessage: 'I’ll pick it up tomorrow.',
      timestamp: '12:45 PM',
      unread: true,
    },
    {
      id: '4',
      product: {
        name: 'Samsung Galaxy S21',
        image:
          'https://images.pexels.com/photos/7443663/pexels-photo-7443663.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Sarah Williams',
      lastMessage: 'Is there a warranty?',
      timestamp: '11:30 AM',
      unread: false,
    },
    {
      id: '5',
      product: {
        name: 'PlayStation 5',
        image:
          'https://images.pexels.com/photos/13459940/pexels-photo-13459940.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Daniel Brown',
      lastMessage: 'Can we meet today?',
      timestamp: '9:00 AM',
      unread: true,
    },
    {
      id: '6',
      product: {
        name: 'Canon EOS R6',
        image:
          'https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Emily Davis',
      lastMessage: 'What’s the condition?',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '7',
      product: {
        name: 'Apple Watch Series 7',
        image:
          'https://images.pexels.com/photos/4370370/pexels-photo-4370370.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'James Carter',
      lastMessage: 'I sent the payment.',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '8',
      product: {
        name: 'Gaming PC',
        image:
          'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Sophia Lee',
      lastMessage: 'Is shipping included?',
      timestamp: '2 days ago',
      unread: true,
    },
    {
      id: '9',
      product: {
        name: 'Electric Scooter',
        image:
          'https://images.pexels.com/photos/11227788/pexels-photo-11227788.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'David Wilson',
      lastMessage: 'Can you share more pictures?',
      timestamp: '3 days ago',
      unread: false,
    },
    {
      id: '10',
      product: {
        name: 'GoPro Hero 9',
        image:
          'https://images.pexels.com/photos/6373476/pexels-photo-6373476.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      user: 'Olivia Martinez',
      lastMessage: 'Is the battery original?',
      timestamp: '1 week ago',
      unread: true,
    },
  ];
  

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
        className='p-4'
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
