//individual category listing component
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const CategoriesListing = memo(({ name, image, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={`Category: ${name}`}
      accessibilityRole="button"
      onPress={() => navigation.navigate('ProductList', { categoryID: id })}
      className="items-center mx-2 mb-4"
      activeOpacity={0.7}
    >
      <View className="h-20 w-20 rounded-full bg-gray-100 mb-2 overflow-hidden">
        <Image 
          source={{ uri: image }} 
          className="h-full w-full"
          resizeMode="cover"
          // defaultSource={require('../assets/placeholder.png')}
          onError={() => console.warn('Failed to load category image:', image)}
        />
      </View>
      <Text 
        className="font-medium text-sm text-gray-700 text-center"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
});

CategoriesListing.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default CategoriesListing;