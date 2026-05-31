import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwmFXxtNWukRtwVjcc3ica2nM8o6GmQgw",
  authDomain: "lheb-store-306e8.firebaseapp.com",
  projectId: "lheb-store-306e8",
  storageBucket: "lheb-store-306e8.firebasestorage.app",
  messagingSenderId: "460023524884",
  appId: "1:460023524884:web:e0e7a9c7a6d95f052e8101",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);