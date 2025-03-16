//individual category element
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

const CategoriesListing = memo(({ name, image, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={`Category: ${name}`}
      onPress={() => navigation.navigate('ProductList', { categoryID: id })}
      className="items-center pl-2">
      <Image source={{ uri: image }} className="h-24 w-24 rounded-full" />
      <Text className="font-light">{name}</Text>
    </TouchableOpacity>
  );
});

export default CategoriesListing;
