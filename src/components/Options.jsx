import { View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React, { useState } from 'react';

const Options = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="relative">
    <TouchableOpacity
      onPress={() => setIsOpen(!isOpen)}
      className="p-2">
      <SimpleLineIcons name="options-vertical" size={24} color="black" />
    </TouchableOpacity>

    {isOpen && (
      <View className="absolute top-10 left-10 bg-white p-2 rounded-lg shadow-lg">
        <TouchableOpacity onPress={() => alert('Reported')}>
          <Text className="text-lg">Report</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
};

export default Options;
