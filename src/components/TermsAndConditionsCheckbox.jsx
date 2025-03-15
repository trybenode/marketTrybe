import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

const TermsAndConditionsCheckbox = ({ isAgreed, setIsAgreed }) => {
  return (
    <View className="mb-4 flex-row items-center">
      <Checkbox
        status={isAgreed ? 'checked' : 'unchecked'}
        onPress={() => setIsAgreed(!isAgreed)}
        color="#6200EE"
      />
      <Text className="ml-2 text-lg">I accept the Terms & Conditions</Text>
    </View>
  );
};

export default TermsAndConditionsCheckbox;
