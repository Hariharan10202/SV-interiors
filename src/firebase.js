import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQuLEjo9UkvjPD26QRNk3yaTq5Kjaqho8',
  authDomain: 'adminpanel-b9d28.firebaseapp.com',
  projectId: 'adminpanel-b9d28',
  storageBucket: 'adminpanel-b9d28.appspot.com',
  messagingSenderId: '560441312497',
  appId: '1:560441312497:web:8d19bed10a6c7413aa5550',
  measurementId: 'G-C2X2DG82DR',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
