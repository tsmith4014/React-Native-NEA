// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAjXcQTtf14jgMPtVXIIqw6VZyq1w4YQd4',
    authDomain: 'nevereveralone-1c8d8.firebaseapp.com',
    projectId: 'nevereveralone-1c8d8',
    storageBucket: 'nevereveralone-1c8d8.appspot.com',
    messagingSenderId: '561739372527',
    appId: '1:561739372527:web:a0812bb305a5027d16481a',
    measurementId: 'G-H496Z4HKEN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
