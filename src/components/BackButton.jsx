import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const BackButton = memo(({ screenName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={tw`mb-4, ml-2`}>
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
});

export default BackButton;
