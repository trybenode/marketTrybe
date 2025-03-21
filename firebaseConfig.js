import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  GOOGLE_WEB_CLIENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
} from '@env'; // works with `react-native-dotenv` been installed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

console.log('FIREBASE_API_KEY:', FIREBASE_API_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const auth = getAuth(app);
const db = getFirestore(app);
const androidId = ANDROID_CLIENT_ID;
const webId= GOOGLE_WEB_CLIENT_ID;
const iosId = IOS_CLIENT_ID;
const expoId = EXPO_CLIENT_ID;

export { app, db, storage, auth, androidId, webId, iosId, expoId };
