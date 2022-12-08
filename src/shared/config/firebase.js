// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCOs_a3jy4ex9b2_yCxyu2h_f2hMGO8LWg',
    authDomain: 'cryptolight-frontend.firebaseapp.com',
    projectId: 'cryptolight-frontend',
    storageBucket: 'cryptolight-frontend.appspot.com',
    messagingSenderId: '159478856719',
    appId: '1:159478856719:web:81df1f519bc897e115777a'
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
