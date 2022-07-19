import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes, setPersistence, browserLocalPersistence} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

setPersistence(auth, browserLocalPersistence).then(() => {
    const createAccount = async () => {
        const email = txtEmail.value;
        const password = txtPassword.value;
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user.uid);
            const userData = doc(firestore, `userData/${userCredential.user.uid}`);
            const userPost = doc(firestore, `userData/${userCredential.user.uid}/Posts/firstPost`);
            await setDoc(userData, {
                username: '',
                occupation: '',
                hobby: '',
                statusmessage: '',
                profileURI: 'https://www.mdcmpwrld.ga/profilepic/DEFAULT',
                currency: 0,
                inventory: [2, 0, 0, 0, 0, 0]
            }, { merge: true });
            const d = new Date();
            await setDoc(userPost, {
                title: "Myworld에 오신 것을 환영합니다!",
                description: "Myworld에 오신 것을 환영합니다! Myworld에서는 게임을 즐기거나 다른 사람들의 피드에 글을 올려 코인을 얻고, 얻은 코인을 이용하여 MyRoom을 얻을 수 있습니다! 좋은 시간 되시기 바랍니다.",
                publishDay: d.toISOString().replace('T', ' ').replace('-', '.').replace('-', '.'),
                publisher: 'MyWorld.ga'
            }, { merge: true });
            location.href = '/myworld';
        } catch(error) {
            console.log(`There was an error: ${error}`);
            if(error.code === AuthErrorCodes.EMAIL_EXISTS) {
                lblSignupErrorMessage.innerHTML = `Email already registered. Try again.`;
            } else {
                lblSignupErrorMessage.innerHTML = `Error. Try again.`;
            }
        }
    }
    
    
    btnSignup.addEventListener("click", createAccount);
});

