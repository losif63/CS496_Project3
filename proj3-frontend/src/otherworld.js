import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, query, addDoc, getDocs, getDoc, setDoc, orderBy, limit } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAu9Uk0w0SzdoMrGhz_gOWlnRLmYA5b8Oo",
    authDomain: "mdcmpwrld.firebaseapp.com",
    projectId: "mdcmpwrld",
    storageBucket: "mdcmpwrld.appspot.com",
    messagingSenderId: "216385430089",
    appId: "1:216385430089:web:1820c6d1d8d96699cf1598"
});

const firestore = getFirestore(firebaseApp);

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');

document.getElementById('post').setAttribute('href', '/writeotherpost?uid=' + uid);

const infoquery = query(doc(firestore, `userData/${uid}`));
const infoquerySnapshot = getDoc(infoquery);
infoquerySnapshot.then((docu) => {
    document.getElementById('profileImg').setAttribute('src', docu.get('profileURI'));
    document.getElementById('username').innerText = `닉네임: ${docu.get('username')}`;
    document.getElementById('occupation').innerText = `직업: ${docu.get('occupation')}`;
    document.getElementById('hobby').innerText = `취미: ${docu.get('hobby')}`;
    document.getElementById('statusmessage').setAttribute('placeholder', docu.get('statusmessage'));
});

const q = query(collection(firestore, `userData/${uid}/Posts`), orderBy("publishDay", "desc"), limit(5));
const querySnapshot = getDocs(q);
const postList = document.getElementById('postlist');
querySnapshot.then((snapshot) => {
    var count = snapshot.size;
    console.log(count);
    snapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
        postList.innerHTML += `<div><div class="num">${count}</div><div class="title"><a href="/viewpost?pid=userData/${uid}/Posts/${doc.id}">${doc.get('title')}</a></div><div class="writer">${doc.get('publisher')}</div><div class="date">${doc.get('publishDay').substring(0, 10)}</div>`;
        count--;
    });
});