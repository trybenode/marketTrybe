import React, { memo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const SaveButton = memo(({ onPress, title, loading }) => (
  <TouchableOpacity
    onPress={loading ? null : onPress} // Disable press when loading
    disabled={loading} // Disable button while loading
    className={`mt-6 w-1/3 items-center self-center rounded-md bg-[#2563eb] p-3 ${loading ? 'opacity-50' : ''}`}>
    
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text className="text-xl font-bold text-white">{title}</Text>
    )}
  </TouchableOpacity>
));

export default SaveButton;
