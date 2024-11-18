import { Platform } from 'react-native';
import { initializeApp as initializeWebApp } from 'firebase/app';
import { getAuth as getWebAuth } from 'firebase/auth';
//import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from './firebase';

export function initializeFirebase() {
  if (Platform.OS === 'web') {
    // Web initialization
    const app = initializeWebApp(firebaseConfig);
    return getWebAuth(app);
  } /*else {
    // Native initialization
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
        return auth();
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
      }
  }
  */
}