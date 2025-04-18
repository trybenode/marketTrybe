import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '639389979099-gc53a496vc1a9umlev2rcorphi471evn.apps.googleusercontent.com', // web client ID from google-services.json
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      if (userInfo.idToken) {
        const credential = GoogleAuthProvider.credential(userInfo.idToken);
        const userCredential = await signInWithCredential(auth, credential);
        setUserInfo(userCredential.user);
        return userCredential.user;
      }
    } catch (error) {
      throw error;
    }
  };

  return { signIn, userInfo };
};
