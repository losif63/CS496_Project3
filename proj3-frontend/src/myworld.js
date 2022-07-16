import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, collection, query, addDoc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
const storage = getStorage();

setPersistence(auth, browserLocalPersistence).then(() => {
    onAuthStateChanged(auth, user => {
        if(user) {
            console.log(`User logged in: ${user.email}`);
            console.log('Getting profile image url!');
            const infoquery = query(doc(firestore, `userData/${user.uid}`));
            const infoquerySnapshot = getDoc(infoquery);
            infoquerySnapshot.then((docu) => {
                const profile = document.getElementById('profileImg');
                const username = document.getElementById('username');
                const occupation = document.getElementById('occupation');
                const hobby = document.getElementById('hobby');
                const statusmessage = document.getElementById('statusmessage');
                profile.setAttribute('src',  docu.get('profileURI'));
                username.innerText = `닉네임: ${docu.get('username')}`;
                occupation.innerText = `직업: ${docu.get('occupation')}`;
                hobby.innerText = `취미: ${docu.get('hobby')}`;
                statusmessage.setAttribute('placeholder', docu.get('statusmessage'));
            });

            // Code for getting user's posts
            // const q = query(collection(firestore, `userData/${user.uid}/Posts`));
            // const querySnapshot = getDocs(q);
            // querySnapshot.then((snapshot) => {
            //     snapshot.forEach(doc => {
            //         console.log(doc.id, " => ", doc.data());
            //     });
            // });
        } else {
            console.log(`Nothing! Nothing at all!`);
        }
    });

    const logout = async () => {
        await signOut(auth);
        console.log('logged out!');
        location.href = "/";
    }
    
    btnLogout.addEventListener("click", logout);
})


