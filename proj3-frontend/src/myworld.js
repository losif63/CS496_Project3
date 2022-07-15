import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, signOut } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAu9Uk0w0SzdoMrGhz_gOWlnRLmYA5b8Oo",
    authDomain: "mdcmpwrld.firebaseapp.com",
    projectId: "mdcmpwrld",
    storageBucket: "mdcmpwrld.appspot.com",
    messagingSenderId: "216385430089",
    appId: "1:216385430089:web:1820c6d1d8d96699cf1598"
});

const auth = getAuth(firebaseApp);

setPersistence(auth, browserLocalPersistence).then(() => {
    const logout = async () => {
        await signOut(auth);
        console.log('logged out!');
        location.href = "/";
    }
    
    btnLogout.addEventListener("click", logout);
});