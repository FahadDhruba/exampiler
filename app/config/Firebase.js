// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDXrOL_N_tkz6kxGFRT8dOxQHfdi8425C8",
    authDomain: "exampiler.firebaseapp.com",
    projectId: "exampiler",
    storageBucket: "exampiler.appspot.com",
    messagingSenderId: "354751244699",
    appId: "1:354751244699:web:dc393e3368b3cdc9ec993e",
    measurementId: "G-YEFMDDW2L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };