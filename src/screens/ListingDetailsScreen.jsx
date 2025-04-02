import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFavoritesStore from '../store/FavouriteStore';
import CustomHeader from '../components/CustomHeader';
import ListingCards from '../components/ListingCards';
import { auth } from '../../firebaseConfig';
import { images, listings } from '../data/dummyData';
import useUserStore from '../store/userStore';
import TestHeader from '../components/TestHeader';
import { getUserIdOfSeller, initiateConversation } from '../hooks/messaginghooks';

export default function ListingDetailsScreen({ route }) {
  const { product, itemId } = route.params;
  const [sellerID, setSellerID] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState('');
  const {
    name,
    description,
    price,
    originalPrice,
    negotiable,
    images = [],
    categoryId,
    brand,
    condition,
    color,
    year,
  } = product;

  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const { favoriteIds, toggleFavorite } = useFavoritesStore();

  // Lets get the user id of the current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserId(user.uid);
      return () => unsubscribe();
    });
  }, []);

  // Add useEffect for fetching seller ID
  useEffect(() => {
    const fetchSellerID = async () => {
      try {
        if (itemId) {
          const id = await getUserIdOfSeller(itemId);
          setSellerID(id);
          // console.log("Seller ID fetched:", id);
        }
      } catch (error) {
        console.error('Error fetching seller ID:', error);
      }
    };

    fetchSellerID();
  }, [itemId]);

  console.log('Product ID:', itemId);
  console.log('Seller ID state:', sellerID);
  console.log('All Favs when loaded: ', favoriteIds);

  // Sync liked state with Zustand store
  useEffect(() => {
    setLiked(favoriteIds.includes(itemId));
    console.log(itemId);
  }, [favoriteIds]);

  // Handle favorite toggle
  const handleLiked = async () => {
    await toggleFavorite(itemId);
    // console.log("All Favs: ", favoriteIds)
  };

  const handleSendMessage = async () => {
    try {
      if (!message.trim() || !currentUserId || !sellerID) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Message and user information required',
        });
        return;
      }

      const productDetails = {
        name: name,
        imageUrl: images[0]?.url || images[0] || '',
        id: itemId,
      };

      const conversationId = await initiateConversation(
        message,
        currentUserId,
        sellerID,
        productDetails
      );

      setMessage('');

      if (conversationId) {
        navigation.navigate('Chat', {
          conversationId,
          otherUserId: sellerID,
          productDetails,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send message',
      });
    }
  };

  const details = [
    { index: 1, label: 'Category', value: categoryId },
    { index: 2, label: 'Brand', value: brand },
    { index: 3, label: 'Condition', value: condition },
    { index: 4, label: 'Color', value: color },
    { index: 5, label: 'Year', value: year },
  ];
  const imagePlaceholders = Array.from({ length: 3 }, (_, i) => ({ id: i, url: null })); //array for place holder if no image available

  const mainImageUri = images && images.length > 0 ? images[0].url || images[0] : null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader
        screenName="MainTabs"
        title="Product Details"
        extraComponent={
          <TouchableOpacity className="flex items-center space-y-1" onPress={() => handleLiked()}>
            <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={30} color="black" />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={listings}
        className="px-3"
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={null}
        ListHeaderComponent={
          <View>
            {/* Carousel with pop-up (modal) on click */}
            <View className=" mt-5">
              <View className="mt-5">
                {images && images.length > 0 ? (
                  <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    className="flex-grow-0"
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => openModal(item.url || item)}>
                        <Image
                          source={{ uri: item.url || item }}
                          className="mr-3 h-72 w-72 rounded-lg"
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <FlatList
                    data={imagePlaceholders}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    className="flex-grow-0"
                    renderItem={() => (
                      <View className="mr-3 h-72 w-72 items-center justify-center rounded-lg bg-gray-300">
                        <Text className="text-lg font-semibold text-gray-700">
                          Image Upload in Progress
                        </Text>
                      </View>
                    )}
                  />
                )}
              </View>

              {/* Title and Price Section */}
              <View className="my-4 p-2">
                <Text className="text-2xl font-bold tracking-tight text-gray-900">{name}</Text>

                <View className="mt-2 flex-row items-center justify-between ">
                  <Text className="text-xl font-extrabold text-green-600">₦{price}</Text>
                  {/* Strike-through original price for discount effect */}
                  <Text className="ml-2 text-sm text-gray-500 line-through">₦{originalPrice}</Text>
                </View>

                {/* Negotiable Badge */}
                {negotiable && (
                  <View className="mt-2 self-start rounded-full bg-green-600 px-3 py-1">
                    <Text className="text-xs text-white">Negotiable</Text>
                  </View>
                )}
              </View>

              {/* Details Section */}
              <View className="">
                <Text className="p-2 text-lg font-bold">Listing Details</Text>

                <View className="mb-4 rounded-lg bg-gray-100 p-2">
                  <View className="flex-row flex-wrap">
                    {details?.map((item, index) => (
                      <View key={index} className="w-1/3 p-2">
                        <Text className="font-bold text-gray-800">{item.label}</Text>
                        <Text className="text-gray-600">{item.value}</Text>
                      </View>
                    ))}
                    <Text className=" mx-auto font-bold text-gray-800">
                      Detailed Product description{' '}
                    </Text>
                    <Text className="mb-4  text-gray-600">{description}</Text>
                  </View>
                </View>
              </View>

              {/* Seller's info Section */}
              <View>
                <Text className="p-2 text-lg font-bold">Sellers Information:</Text>
                <View className="rounded-lg bg-gray-100 p-4">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Shop');
                    }}>
                    <Text className="font-bold text-gray-600">Name</Text>
                    <Text className="mb-4 text-lg">Demilade Femi</Text>
                  </TouchableOpacity>

                  <Text className=" font-bold text-gray-600">Location</Text>
                  <Text className="mb-4 text-lg">Hostile, blah blah blah</Text>
                </View>
              </View>

              {/* Message user */}
              <View className="border-t border-gray-200 p-4">
                <Text className="mb-2 text-lg font-semibold">Make an Offer:</Text>
                <View className="flex-row items-center">
                  <TextInput
                    className="flex-1 rounded-lg border border-gray-300 p-2 text-gray-800"
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={setMessage}
                  />
                  <TouchableOpacity
                    className="ml-4 rounded-lg bg-blue-500 px-4 py-2"
                    onPress={handleSendMessage}>
                    <Text className="font-semibold text-white">Send</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* {related products} */}
              <View className="p-2 ">
                <Text className=" my-7 text-center text-lg font-semibold">Related Items</Text>
                <ListingCards />
              </View>

              {/* ⚠️ MODAL KEEP AT BOTTOM */}
              {/* Modal for full-screen image */}
              <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 items-center justify-center bg-black/90">
                  {selectedImage && (
                    <Image
                      source={{ uri: selectedImage }}
                      className="h-4/5 w-11/12 rounded-lg"
                      resizeMode="contain"
                    />
                  )}
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    className="mt-5 rounded bg-white px-4 py-2">
                    <Text className="px-2 text-lg">Close</Text>
                  </Pressable>
                </View>
              </Modal>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
