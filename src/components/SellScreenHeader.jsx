import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const  SellScreenHeader = ({ screenName }) => {
  const navigation = useNavigation();
  const handleBack = () => {
    if (screenName) {
      navigation.navigate(screenName);
    } else {
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
            <TouchableOpacity
              onPress={() => {
                if (hasUnsavedChanges()) {
                  Alert.alert(
                    'Unsaved Changes',
                    'You have unsaved changes. Are you sure you want to exit?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Exit',
                        style: 'destructive',
                        onPress: () => {
                          clearForm(); // Clear form when leaving
                          navigation.goBack(); // Navigate back
                        },
                      },
                    ]
                  );
                } else {
                  clearForm(); // Clear form when no unsaved changes
                  navigation.goBack(); // Navigate back
                }
              }}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {/* Center - Title */}
          <View className="flex-shrink">
            <Text className="text-center text-xl font-extrabold">Product Information</Text>
          </View>

          {/* Right - Extra component or placeholder */}
          <View className="flex-1 items-end">
            {typeof extraComponent === 'string' ? (
              <Text>{extraComponent}</Text>
            ) : extraComponent ? (
              extraComponent
            ) : (
              <View style={{ width: 30 }} /> // Placeholder to balance layout
            )}
          </View>
        </View>
        {/* Bottom Shadow */}
        <View style={styles.bottomShadow} />
      </View>
      );
    </View>
  );
};

export default  SellScreenHeader;
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

