import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, query, addDoc, getDocs, getDoc, setDoc, where, orderBy, limit } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAu9Uk0w0SzdoMrGhz_gOWlnRLmYA5b8Oo",
    authDomain: "mdcmpwrld.firebaseapp.com",
    projectId: "mdcmpwrld",
    storageBucket: "mdcmpwrld.appspot.com",
    messagingSenderId: "216385430089",
    appId: "1:216385430089:web:1820c6d1d8d96699cf1598"
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const urlParams = new URLSearchParams(window.location.search);
const pid = urlParams.get('pid');

const postQuery = query(doc(firestore, pid));
const postquerySnapshot = getDoc(postQuery);
postquerySnapshot.then((docu) => {
    document.getElementById('title').innerText = docu.get('title');
    document.getElementById('publisher').innerText = docu.get('publisher');
    document.getElementById('publishday').innerText = docu.get('publishDay').substring(0, 10);
    document.getElementById('description').innerText = docu.get('description');
});