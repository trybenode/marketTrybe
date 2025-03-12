import { View, Text, TouchableOpacity} from 'react-native';
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
      <View className="absolute p-2 rounded-lg shadow-lg" style={{ backgroundColor: '#2563eb', top: 35, right: 5, width: 100, zIndex: 10 }}>
        <TouchableOpacity onPress={() => alert('Reported')}>
          <Text className="text-lg">Report</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  );
};

export default Options;
