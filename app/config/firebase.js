import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDXrOL_N_tkz6kxGFRT8dOxQHfdi8425C8",
    authDomain: "exampiler.firebaseapp.com",
    databaseURL: "https://exampiler-default-rtdb.firebaseio.com",
    projectId: "exampiler",
    storageBucket: "exampiler.firebasestorage.app",
    messagingSenderId: "354751244699",
    appId: "1:354751244699:web:dc393e3368b3cdc9ec993e",
    measurementId: "G-YEFMDDW2L4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };