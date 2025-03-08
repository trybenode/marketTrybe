import { View, Text, TouchableOpacity, Dimensions, FlatList, Image, Modal, Pressable} from 'react-native';
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
      <View className="flex-row items-center justify-between">
        {/* Back to Homepage */}
        <TouchableOpacity className="p-2">
          <BackButton screenName="Market" />
        </TouchableOpacity>

        {/* Add to Favourites */}
        <TouchableOpacity className="flex items-center space-y-1">
          <Fontisto name="favorite" size={24} color="black" />
          <Text className="mt-2 text-lg text-black">Add to Favourites</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel with pop-up (modal) on click */}
      <View className="flex-1 mt-5">
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item.url)}>
            <Image
              source={{ uri: item.url }}
              className="w-80 h-80 rounded-lg mr-3"
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* Modal for full-screen image */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/90 justify-center items-center">
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              className="w-11/12 h-4/5 rounded-lg"
              resizeMode="contain"
            />
          )}
          <Pressable
            onPress={() => setModalVisible(false)}
            className="mt-5 bg-white px-4 py-2 rounded"
          >
            <Text className="text-lg font-bold">Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
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
