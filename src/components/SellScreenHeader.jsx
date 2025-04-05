import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';

const SellScreenHeader = ({
  extraComponent,
  hasUnsavedChanges,
  clearForm,
  isEditMode,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (isEditMode && hasUnsavedChanges) {
      Alert.alert('Unsaved Changes', 'You have unsaved changes. Are you sure you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            // Go to 'MyShop' when in edit mode
            clearForm();
            navigation.navigate('MyShop');
          },
        },
      ]);
    } else if(hasUnsavedChanges()) {
      Alert.alert('Unsaved Changes', 'You have unsaved changes. Are you sure you want to exit?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            clearForm();
            navigation.goBack();
          },
        },
      ]);
    }else{
      navigation.goBack();
    }
  };

  return (
    <View>
      <View className="pt-2">
        <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
        <View className="relative h-16 flex-row items-center bg-white px-3">
          {/* Left - Back Button */}
          <View className="flex-1">
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {/* Center - Absolute Positioned Title */}
          <View className="absolute left-0 right-0 items-center">
            <Text className="text-center text-xl font-extrabold">{isEditMode? "Product Edit" : "Product Information"}</Text>
          </View>

          {/* Right - Optional Component */}
          <View className="flex-1 items-end">
            {typeof extraComponent === 'string' ? (
              <Text>{extraComponent}</Text>
            ) : extraComponent ? (
              extraComponent
            ) : (
              <View style={{ width: 30 }} /> // placeholder
            )}
          </View>
        </View>

        {/* Bottom Shadow */}
        <View style={styles.bottomShadow} />
      </View>
    </View>
  );
};

export default memo(SellScreenHeader);

const styles = StyleSheet.create({
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0A0A0A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    zIndex: -1,
  },
});
