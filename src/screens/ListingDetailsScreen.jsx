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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Carousel from 'react-native-reanimated-carousel';
import BackButton from '../components/BackButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { images } from '../data/dummyData';

function ListingDetailsScreen({ route }) {
  const ID = route.params;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const isNegotaible = true;
  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  // const images = [
  //   'https://via.placeholder.com/300',
  //   'https://via.placeholder.com/300/111',
  //   'https://via.placeholder.com/300/222',
  // ];

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView>
        <View className="flex-row items-center justify-between">
          {/* Back to Homepage */}
          <TouchableOpacity className="p-2">
            <BackButton screenName="Market" />
          </TouchableOpacity>

          {/* Add to Favourites */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Shop')}
            className="flex items-center space-y-1">
            <Fontisto name="favorite" size={24} color="black" />
            <Text className="mt-2 text-lg text-black">Add to Favourites</Text>
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

          {isNegotaible && (
            <View className="absolute rounded-full px-3 py-1" style={{ backgroundColor: 'green' }}>
              <Text className="text-sm font-semibold text-white">Negotiable</Text>
            </View>
          )}

          <View className="p-2 my-4">
            <Text className="text-2xl font-bold">Brand new flat screen TV</Text>
            <Text className="text-xl font-bold">Price: #40,000:00</Text>
          </View>

          {/* Details Section */}
          <Text className="p-2 text-lg font-bold">Extra Information:</Text>
          <View className="mb-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
            <Text className="text-lg font-bold">Listing Details</Text>
            <Text className="text-gray-600">Here are some details about the listing...</Text>
          </View>
          {/* More Info Section */}
          <Text className="p-2 text-lg font-bold">Sellers Information:</Text>
          <View className="mt-4 rounded-lg bg-gray-100 p-4">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shop');
              }}>
              <Text className="text-lg">Demilade Femi</Text>
              <Text className="mb-4 font-bold text-gray-600">Name</Text>
            </TouchableOpacity>

            <Text className="text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima deserunt inventore dolore quisquam nulla! Quisquam, obcaecati, molestiae et cupiditate quo facere consequatur voluptatum facilis vel voluptates modi non dolor reiciendis.</Text>
            <Text className="mb-4 font-bold text-gray-600">Detailed Product description </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;

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
