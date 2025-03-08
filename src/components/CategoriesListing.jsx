import { TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import { categories } from '../data/dummyData';
const CategoriesListing = ({ name, image, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={`Category: ${name}`}
      onPress={() => navigation.navigate('ProductList', { categoryID: id })}
      className="items-center pl-2">
      <Image
        source={{ uri: image }}
        className="h-24 w-24 rounded-full"
        // onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
        // defaultSource={require('../assets/fallback-image.png')}
      />
      <Text className="font-light">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesListing;
