import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { CheckCircleIcon } from "lucide-react-native";

const CustomModal = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 rounded-2xl gap-2 bg-white p-6 shadow-lg">
          {/* Icon */}
          <View className="mb-4 items-center">
            <CheckCircleIcon size={80} color="#14b8a6" />
            <Text className="mb-2 text-center text-xl font-bold text-gray-800">
                Success!
            </Text>
          </View>

          {/* Message */}
          <Text className="mb-4 text-center text-gray-600">{message}</Text>

          {/* Button */}
          <TouchableOpacity
            className="w-full mt-3 items-center rounded-full bg-teal-500 py-3"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
