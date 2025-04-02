import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

export default function NetworkListener() {
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setWasOffline(true); // Mark as offline
        Toast.show({
          type: "error",
          text1: "No Internet Connection",
          text2: "Please check your network settings",
          position: "top",
          visibilityTime: 4000,
        });
      } else if (wasOffline) {
        setWasOffline(false); // Reset when back online
        Toast.show({
          type: "success",
          text1: "Back Online",
          text2: "You are connected to the internet",
          position: "top",
          visibilityTime: 3000,
        });
      }
    });

    return () => unsubscribe();
  }, [wasOffline]);

  return null;
}
