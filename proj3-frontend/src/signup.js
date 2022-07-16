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
            await setDoc(userData, {
                username: '',
                occupation: '',
                hobby: '',
                statusmessage: '',
                profileURI: 'https://www.mdcmpwrld.ga/profilepic/DEFAULT'
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

