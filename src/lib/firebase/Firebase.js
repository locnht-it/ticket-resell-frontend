import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZvUg8C8r46ASewyC2Sk2AGZh1l6UgWDM",
  authDomain: "ticket-resell-app-33551.firebaseapp.com",
  projectId: "ticket-resell-app-33551",
  storageBucket: "ticket-resell-app-33551.appspot.com",
  messagingSenderId: "663090094318",
  appId: "1:663090094318:web:23468faec61f5d4aa353ff",
  measurementId: "G-PH3VGDM69C",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
