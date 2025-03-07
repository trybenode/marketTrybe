import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} className="mb-4">
      <Ionicons name="arrow-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
