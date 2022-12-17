// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from '~/shared/config/index';

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

// Initialize Firebase
let app;

try {
    app = initializeApp(firebaseConfig);
} catch (err) {
    console.error(err);
    // ignore app already initialized error in snack
}

export const auth = getAuth(app);
export const db = getFirestore(app);

export const docRefUserLikedCoins = doc(db, 'userLikedCoins', '2022-12-08');
