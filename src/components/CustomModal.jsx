import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const CustomModal = ({ isVisible, onClose, title, message }) => {
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View className="bg-white p-6 rounded-md shadow-lg gap-2 flex-col items-center">
        <Text className="text-xl font-bold mb-2">{title}</Text>
        <Text className="text-gray-600 text-center mb-4">{message}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-2 rounded-md"
          onPress={onClose}
        >
          <Text className="text-white font-semibold">OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
