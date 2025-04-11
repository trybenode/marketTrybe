import * as ImagePicker from 'expo-image-picker';
import React, { useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

const UploadImages = memo(({ onImagesSelected, initialImages = [] }) => {
  const [images, setImages] = useState(initialImages || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const compressImage = async (uri) => {
    const compressed = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
    );
    return compressed.uri;
  };

  const selectImages = async () => {
    try {
      setIsLoading(true); // Start loading
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Sorry, we need camera roll permissions to upload images.'
        );
        setIsLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 5,
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = await Promise.all(
          result.assets.map(async (asset) => {
            const compressedUri = await compressImage(asset.uri); // Compress the image
            return compressedUri;
          })
        );
        const updatedImages = [...images, ...newImages].slice(0, 5); // Ensure max 5 images
        setImages(updatedImages);
        onImagesSelected(updatedImages); // Pass images back to parent
      }
    } catch (error) {
      console.error('Image Picker Error', error);
      Alert.alert('Error', 'Failed to select images. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesSelected(updatedImages);
  };

  return (
    <View className="items-center">
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="my-4" />
      ) : images.length === 0 ? (
        <TouchableOpacity
          onPress={selectImages}
          className="h-36 w-36 items-center justify-center rounded-lg border-2 border-gray-300">
          <Text className="mt-2 text-gray-500">Upload Images</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={images.filter((uri) => !!uri)}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className=""
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item }}
                className="mr-2 h-36 w-36 rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1">
                <Ionicons name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text className="text-left text-red-500">*Please upload product photos here</Text>

      {images.length > 0 && images.length < 5 && (
        <TouchableOpacity onPress={selectImages} className="mt-2 rounded-lg bg-blue-500 px-4 py-2">
          <Text className="text-white">Add More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default UploadImages;
