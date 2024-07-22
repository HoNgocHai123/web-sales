// Import các hàm bạn cần từ SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage"
// Cấu hình Firebase cho ứng dụng web của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCYI3qnQZEAFHLTsRMvavkxHa80sZqGasQ",
  authDomain: "crud-app-js-42177.firebaseapp.com",
  projectId: "crud-app-js-42177",
  storageBucket: "crud-app-js-42177.appspot.com",
  messagingSenderId: "734591815076",
  appId: "1:734591815076:web:c5aa185179fa2b8e3f4531",
  measurementId: "G-9V1GH2BBP4"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app)