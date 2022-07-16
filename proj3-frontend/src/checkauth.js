import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

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
    onAuthStateChanged(auth, user => {
        if(user && (window.location.href === "https://www.mdcmpwrld.ga/login" || window.location.href === "https://www.mdcmpwrld.ga/signup")) {
            console.log(`User ${user.email} is logged in!`);
            console.log(window.location.href);
            location.href = "/myworld";
            console.log('Redirection to myworld!');
        } else if (user && window.location.href === "https://www.mdcmpwrld.ga/") {
            console.log('Changing button redirection!');
            document.getElementById("btnLogin").href = "/myworld";
            document.getElementById("btnSignup").href = "/myworld";
            document.getElementById("btn").href = "/myworld";
        }else if(!user && window.location.href === "https://www.mdcmpwrld.ga/myworld"){
            console.log(`User is not logged in!`);
            location.href = "/login";
            console.log('Redirection to login page!');
        } else if (!user && window.location.href === "https://www.mdcmpwrld.ga/") {
            console.log('Changing button redirection2!');
            document.getElementById("btnMyworld").href = "/login";
        }
    });
});

console.log('Hello!');



