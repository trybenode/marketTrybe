import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFavoritesStore from '../store/FavouriteStore';
import Toast from 'react-native-toast-message';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import TestHeader from '../components/TestHeader';
import { getUserIdOfSeller, initiateConversation } from '../hooks/messaginghooks';
import UserDetailsAndRelatedProducts from '../components/UserDetailsAndRelatedProducts';

export default function ListingDetailsScreen({ route }) {
  // const { product, itemId } = route.params;
  const { product, itemId: routeItemId } = route.params;
  const itemId = routeItemId || product?.id;
  const [sellerID, setSellerID] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const effectiveProductId = itemId || currentProduct?.id;

  // Memoized favoriteIds to prevent unnecessary updates
  const stableFavoriteIds = useMemo(() => favoriteIds, [favoriteIds]);

  // Normalize product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (product) {
          setCurrentProduct({
            ...product,
            id: itemId || product.id,
          });
          return;
        }

  
        if (itemId) {
          const docRef = doc(db, 'products', itemId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentProduct({
              id: docSnap.id,
              ...docSnap.data(),
            });
          } else {
            console.warn('Product not found');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product, itemId]);

  // Get current user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  // Set seller ID when product is available
  useEffect(() => {
    if (currentProduct?.userId) {
      setSellerID(currentProduct.userId);
    } else if (itemId) {
      // Fallback to fetch seller ID if not in product data
      const fetchSeller = async () => {
        try {
          const id = await getUserIdOfSeller(itemId);
          if (id) setSellerID(id);
        } catch (error) {
          console.error('Error fetching seller ID:', error);
        }
      };
      fetchSeller();
    }
  }, [currentProduct, itemId]);

  // Destructured product with fallbacks
  const {
    name = '',
    description = '',
    price = 0,
    originalPrice = 0,
    negotiable = false,
    images = [],
    categoryId = '',
    brand = '',
    condition = '',
    subcategory = '',
    color = '',
    year = '',
  } = currentProduct || {};

  // Sync liked state with Zustand store
  useEffect(() => {
    if (effectiveProductId) {
      setLiked(stableFavoriteIds.includes(effectiveProductId));
    }
  }, [stableFavoriteIds, effectiveProductId]);

  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleLiked = async () => {
    if (effectiveProductId) {
      await toggleFavorite(effectiveProductId);
    }
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
        name,
        imageUrl: images[0]?.url || images[0] || '',
        id: effectiveProductId,
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
    { index: 2, label: 'Sub Categories', value: subcategory },
    { index: 3, label: 'Brand', value: brand },
    { index: 4, label: 'Condition', value: condition },
    { index: 5, label: 'Color', value: color },
    { index: 6, label: 'Year', value: year },
  ];
  const imagePlaceholders = Array.from({ length: 3 }, (_, i) => ({ id: i, url: null })); //array for place holder if no image available

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TestHeader
        screenName="MainTabs"
        title="Product Details"
        extraComponent={
          <TouchableOpacity className="flex items-center space-y-1" onPress={handleLiked}>
            <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={30} color="black" />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={[]}
        className="px-3"
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={null}
        ListHeaderComponent={
          <View>
            {/* Carousel with pop-up (modal) on click */}
            <View className="mt-5">
              <View className="mt-5">
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
                
              </View>

              {/* Title and Price Section */}
              <View className="border-b-hairline my-4 rounded-lg border-blue-500 bg-gray-100 p-4 ">
                <Text className="text-2xl font-bold tracking-tight text-gray-900">{name}</Text>

                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-xl font-extrabold text-green-600">₦{price}</Text>
                  {originalPrice > 0 && (
                    <Text className="ml-2 text-sm text-gray-500 line-through">
                      ₦{originalPrice}
                    </Text>
                  )}
                </View>

                {negotiable && (
                  <View className="mt-2 self-start rounded-full bg-green-600 px-3 py-1">
                    <Text className="text-xs text-white">Negotiable</Text>
                  </View>
                )}
              </View>

              {/* Details Section */}
              <View>
                <Text className="p-2 text-lg font-bold">Listing Details</Text>

                <View className="border-b-hairline mb-4 rounded-lg border-blue-500 bg-gray-100 p-2">
                  <View className="flex-row flex-wrap">
                    {details.map((item, index) => (
                      <View key={index} className="w-1/3 p-2">
                        <Text className="font-bold text-gray-800">{item.label}</Text>
                        <Text className="text-gray-500">{item.value || 'N/A'}</Text>
                      </View>
                    ))}
                  </View>
                  <View className=" flex flex-col">
                    <Text className="mx-auto ml-2 flex w-full text-start font-bold text-gray-800">
                      Detailed Product description
                    </Text>
                    <Text className="mb-4 ml-2 flex text-gray-600">
                      {description || 'No description available'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Message user */}
              <View className="border-b-hairline mb-4 rounded-lg border-t border-blue-500 bg-gray-100  p-4">
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
              {/* Seller's info Section */}
              <UserDetailsAndRelatedProducts
                key={effectiveProductId}
                productId={effectiveProductId}
                product={currentProduct}
              />
            </View>
          </View>
        }
      />

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
    </SafeAreaView>
  );
}
