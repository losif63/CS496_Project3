import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes, setPersistence, browserLocalPersistence } from 'firebase/auth';

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
    const loginEmailPassword = async () => {
        const loginEmail = txtEmail.value;
        const loginPassword = txtPassword.value;
    
        try{
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(userCredential.user);
            location.href = '/myworld';
        } catch(error) {
            console.log(error);
            if(error.code === AuthErrorCodes.INVALID_PASSWORD) {
                lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
            } else if (error.code === AuthErrorCodes.INVALID_EMAIL){
                lblLoginErrorMessage.innerHTML = `Unregistered email. Try again.`;
            } else {
                lblLoginErrorMessage.innerHTML = `Error. Try again.`;
            }
        }
    }
    
    const signupRedirect = () => {
        location.href = '/signup';
    }
    
    btnLogin.addEventListener("click", loginEmailPassword);
    btnSignupRedirect.addEventListener("click", signupRedirect);
    
});

