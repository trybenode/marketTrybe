//report component used in chart
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Options = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="p-2">
        <SimpleLineIcons name="options-vertical" size={24} color="black" />
      </TouchableOpacity>

      {isOpen && (
        <View
          className="absolute rounded-lg p-2 shadow-lg"
          style={{ backgroundColor: '#2563eb', top: 35, right: 5, width: 100, zIndex: 10 }}>
          <TouchableOpacity onPress={() => alert('Reported')}>
            <Text className="text-lg">Report</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Options;
