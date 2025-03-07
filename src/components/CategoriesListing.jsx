import { TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import { categories } from '../data/dummyData';
const CategoriesListing = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={`Category: ${item.name}`}
      onPress={() => navigation.navigate('ProductList', { categoryId: item.id })}
      className="items-center pl-2">
      <Image
        source={{ uri: item.image }}
        className="h-24 w-24 rounded-full"
        // onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
        // defaultSource={require('../assets/fallback-image.png')}
      />
      <Text className="font-light">{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesListing;
