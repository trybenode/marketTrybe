import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Carousel from 'react-native-reanimated-carousel';
import BackButton from '../components/BackButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { images } from '../data/dummyData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ListingCards from '../components/ListingCards';
import { listings } from '../data/dummyData';

export default function ListingDetailsScreen({ route }) {
  const ID = route.params;
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const isNegotiable  = true;
  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const details = [
    { label: 'Condition', value: 'New' },
    { label: 'Brand', value: 'Samsung' },
    { label: 'Model', value: 'Galaxy S21' },
    { label: 'Color', value: 'Black' },
    { label: 'Storage', value: '128GB' },
    { label: 'Battery', value: '4000mAh' },
  ];

  // const images = [
  //   'https://via.placeholder.com/300',
  //   'https://via.placeholder.com/300/111',
  //   'https://via.placeholder.com/300/222',
  // ];

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <FlatList
      data={listings}
      keyExtractor={(item) => item.id}
      ListFooterComponent={null}
      ListHeaderComponent={
        <View>
           <View className="flex-row items-center justify-between">
          <BackButton screenName="MainTabs" />
          <TouchableOpacity
            className="flex items-center space-y-1"
            onPress={() => setLiked(!liked)}>
            <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Carousel with pop-up (modal) on click */}
        <View className=" mt-5">
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }} // ✅ Remove extra padding
            className="flex-grow-0" // ✅ Prevents unnecessary space
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item.url)}>
                <Image
                  source={{ uri: item.url }}
                  className="mr-3 h-72 w-72 rounded-lg"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />

          {/* Ngotiable indicator */}
          {isNegotiable  && (
            <View className="absolute rounded-full px-3 py-1" style={{ backgroundColor: 'green' }}>
              <Text className="text-sm font-semibold text-white">Negotiable</Text>
            </View>
          )}

          {/* Title and price */}
          <View className="my-4 p-2">
            <Text className="text-2xl font-bold">Brand new flat screen TV</Text>
            <Text className="text-xl font-bold">Price: #40,000:00</Text>
          </View>

          {/* Details Section */}
          <View className="">
            <Text className="p-2 text-lg font-bold">Listing Details</Text>

            <View className="mb-4 rounded-lg bg-gray-100 p-2">
              <View className="flex-row flex-wrap">
                {details.map((item, index) => (
                  <View key={index} className="w-1/3 p-2">
                    <Text className="font-semibold text-gray-800">{item.label}</Text>
                    <Text className="text-gray-600">{item.value}</Text>
                  </View>
                ))}
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

              <Text className="font-bold text-gray-600">Detailed Product description </Text>
              <Text className="mb-4 text-lg">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima deserunt inventore
                dolore quisquam nulla! Quisquam, obcaecati, molestiae et cupiditate quo facere
                consequatur voluptatum facilis vel voluptates modi non dolor reiciendis.
              </Text>

              <Text className=" font-bold text-gray-600">Location</Text>
              <Text className="mb-4 text-lg">Hostile, blah blah blah</Text>
            </View>
          </View>

          {/* Message user */}
          <View className="border-t border-gray-200 p-4">
            <Text className="mb-2 text-lg font-semibold">Send a Message:</Text>

            <View className="flex-row items-center">
              <TextInput
                className="flex-1 rounded-lg border border-gray-300 p-2 text-gray-800"
                placeholder="Type your message..."
              />
              <TouchableOpacity className="ml-4 rounded-lg bg-blue-500 px-4 py-2">
                <Text className="font-semibold text-white">Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="p-2 ">
            <Text className=" my-7 text-center text-lg font-semibold">Related Items</Text>
            <ListingCards data={listings} buttomPad={10} />
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
                <Text className="text-lg font-bold">Close</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        </View>
      } 
      renderItem={({item}) => (
        <ListingCards  {...item} buttomPad={0} />
      )}
      showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

{
  /* <Carousel

        loop
        width={width}
        height={250}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={500}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
          />
        )}

      /> */
}
