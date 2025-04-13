import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { androidId, auth, expoId, webId, iosId } from '../../../firebaseConfig';
import * as AuthSession from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState();

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoId,
    webClientId: webId,
    iosClientId: iosId,
    androidClientId: androidId,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log('Firebase sign-in successful');
        })
        .catch((err) => {
          console.error('Firebase sign-in error:', err.message);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log('failed');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { promptAsync, userInfo };
};

// export const useGoogleAuth = () => {
//   const [userInfo, setUserInfo] = useState();
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     iosClientId: iosId,
//   });
// };
