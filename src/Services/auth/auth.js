// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
// import { useEffect, useState } from 'react';
// import { androidId, auth, expoId, webId, iosId} from '../../../firebaseConfig';

// WebBrowser.maybeCompleteAuthSession();

// export const useGoogleAuth = () => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: expoId,
//     iosClientId: iosId,
//     androidClientId: androidId,
//     // webClientId: webId,
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   return { promptAsync };
// };
