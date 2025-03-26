// import React from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";
// import AntDesign from '@expo/vector-icons/AntDesign';
// // import { CheckCircleIcon } from "lucide-react-native";

// const CustomModal = ({ visible, message, onClose }) => {
//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View className="flex-1 items-center justify-center bg-black/50">
//         <View className="w-4/5 rounded-2xl gap-2 bg-white p-8 shadow-lg">
//           {/* Icon */}
//           <View className="mb-4 items-center">
//             <AntDesign name="checkcircle" size={80} color="#14b8a6" />

//             {/* <CheckCircleIcon size={80} color="#14b8a6" /> */}
//             <Text className="mb-2 text-center text-xl font-bold text-gray-800">
//                 Success!
//             </Text>
//           </View>

//           {/* Message */}
//           <Text className="mb-4 text-center text-gray-600">{message}</Text>

//           {/* Button */}
//           <TouchableOpacity
//             className="w-full mt-3 items-center rounded-full bg-teal-500 py-3"
//             onPress={onClose}
//           >
//             <Text className="text-white font-semibold">OK</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default CustomModal;




import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const CustomModal = ({ visible, message, onClose, iconType = "success" }) => {
  // Determine the icon and color based on the iconType state
  const iconConfig = {
    success: { name: "checkcircle", color: "#14b8a6", title: "Success!" },
    caution: { name: "warning", color: "#f59e0b", title: "Warning!" },
  };

  const { name, color, title } = iconConfig[iconType] || iconConfig.success;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-4/5 rounded-2xl gap-2 bg-white p-8 shadow-lg">
          {/* Icon */}
          <View className="mb-4 items-center">
            <AntDesign name={name} size={80} color={color} />
            <Text className="mb-2 text-center text-xl font-bold text-gray-800">
              {title}
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

