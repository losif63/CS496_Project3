import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, query, increment, updateDoc } from 'firebase/firestore';

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

onAuthStateChanged(auth, user => {
    const uploadPost = async () => {
        const infoquery = query(doc(firestore, `userData/${user.uid}`));
        const infoquerySnapshot = await getDoc(infoquery);
        const myusername = infoquerySnapshot.get('username');
        const mytitle = document.getElementById('titleInput').value;
        const mydescription = document.getElementById('descriptionInput').value;
        const d = new Date()
        const mypublishDay = d.toISOString().replace('T', ' ').replace('-', '.').replace('-', '.');


        const newPost = doc(firestore, `userData/${user.uid}/Posts/${mytitle}`);
        await setDoc(newPost, {
            title: mytitle,
            publisher: myusername,
            publishDay: mypublishDay,
            description: mydescription
        }, { merge: true });
        location.href = '/myworld';

        const userData = doc(firestore, `userData/${user.uid}`);
        await updateDoc(userData, { 
            currency: increment(10)
        });
    }
    
    btnWritePost.addEventListener("click", uploadPost);
});


