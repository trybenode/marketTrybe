// social auth buttons used on sign in and sign up page
import React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SocialAuthButton = ({
  name,
  type,
  backgroundColor = '#ffffff',
  iconColor = '#000000',
  size = 36,
  borderColor = '#d1d5db',
  borderWidth = 1,
}) => {
  return (
    <View>
      <View
        className="items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor,
          borderColor,
          borderWidth,
        }}>
        {type === 'FontAwesome' ? (
          <FontAwesome name={name} size={size * 0.5} color={iconColor} />
        ) : (
          <Ionicons name={name} size={size * 0.5} color={iconColor} />
        )}
      </View>
    </View>
  );
};

export default SocialAuthButton;
