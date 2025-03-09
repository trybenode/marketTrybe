import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadImages = memo(() => {
  const [images, setImages] = useState([]);

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Ensures max 5 images
    }
  };

  return (
    <View className="mb-6 items-center">
      {/* Upload Button */}
      {images.length === 0 ? (
        <TouchableOpacity
          onPress={selectImages}
          className="h-36 w-36 items-center justify-center rounded-lg border-2 border-gray-300">
          <Text className="mt-2 text-gray-500">Upload Images</Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2"
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              className="mr-3 h-36 w-36 rounded-lg"
              resizeMode="cover"
            />
          )}
        />
      )}
      <Text className="text-red-500 text-left">*Please upload product photos here</Text>

      {/* Upload More Button (If Less than 5 Images) */}
      {images.length > 0 && images.length < 5 && (
        <TouchableOpacity onPress={selectImages} className="mt-2 rounded-lg bg-blue-500 px-4 py-2">
          <Text className="text-white">Add More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default UploadImages;

// import React, { useState, memo } from 'react';
// import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// const UploadImages = memo(() => {
//   const [images, setImages] = useState([]);

//   const selectImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: [ImagePicker.MediaType.IMAGE], // ✅ Use new MediaType
//       allowsMultipleSelection: true,
//       selectionLimit: 5,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const newImages = result.assets.map((asset) => asset.uri);
//       setImages((prev) => [...prev, ...newImages].slice(0, 5)); // Ensures max 5 images
//     }
//   };

//   return (
//     <View className="mb-6 items-center">
//       {/* Upload Button */}
//       {images.length === 0 ? (
//         <TouchableOpacity
//           onPress={selectImages}
//           className="h-36 w-36 items-center justify-center rounded-lg border-2 border-gray-300">
//           <Text className="mt-2 text-gray-500">Upload Images</Text>
//         </TouchableOpacity>
//       ) : (
//         <FlatList
//           data={images}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           className="mt-2"
//           renderItem={({ item }) => (
//             <Image
//               source={{ uri: item }}
//               className="mr-3 h-36 w-36 rounded-lg"
//               resizeMode="cover"
//             />
//           )}
//         />
//       )}
//       <Text className="text-red-500 text-left">*Please upload product photos here</Text>

//       {/* Upload More Button (If Less than 5 Images) */}
//       {images.length > 0 && images.length < 5 && (
//         <TouchableOpacity onPress={selectImages} className="mt-2 rounded-lg bg-blue-500 px-4 py-2">
//           <Text className="text-white">Add More</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// });

// export default UploadImages;
