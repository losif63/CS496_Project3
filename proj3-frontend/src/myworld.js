import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
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

setPersistence(auth, browserLocalPersistence).then(() => {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log(`User logged in: ${user.email}`);
            console.log('Getting profile image url!');
            const infoquery = query(doc(firestore, `userData/${user.uid}`));
            const infoquerySnapshot = getDoc(infoquery);
            infoquerySnapshot.then((docu) => {
                document.getElementById('profileImg').setAttribute('src', docu.get('profileURI'));
                document.getElementById('username').innerText = `닉네임: ${docu.get('username')}`;
                document.getElementById('usernameInput').value = docu.get('username');
                document.getElementById('occupation').innerText = `직업: ${docu.get('occupation')}`;
                document.getElementById('occupationInput').value = docu.get('occupation');
                document.getElementById('hobby').innerText = `취미: ${docu.get('hobby')}`;
                document.getElementById('hobbyInput').value = docu.get('hobby');
                document.getElementById('statusmessage').setAttribute('placeholder', docu.get('statusmessage'));
                document.getElementById('statusmsgInput').value = docu.get('statusmessage');
                document.getElementById('currency').innerText = docu.get('currency');
            });

            // Code for getting user's posts
            const q = query(collection(firestore, `userData/${user.uid}/Posts`), orderBy("publishDay", "desc"), limit(5));
            const querySnapshot = getDocs(q);
            const postList = document.getElementById('postlist');
            querySnapshot.then((snapshot) => {
                var count = snapshot.size;
                snapshot.forEach(doc => {
                    // console.log(doc.id, " => ", doc.data());
                    postList.innerHTML += `<div><div class="num">${count}</div><div class="title"><a href="/viewpost?pid=userData/${user.uid}/Posts/${doc.id}">${doc.get('title')}</a></div><div class="writer">${doc.get('publisher')}</div><div class="date">${doc.get('publishDay').substring(0, 10)}</div>`;
                    count--;
                });
            });
        } else {
            console.log(`Nothing! Nothing at all!`);
        }
    });

    const logout = async () => {
        await signOut(auth);
        console.log('logged out!');
        location.href = "/";
    }

    const onProcEditProfileClick = async () => {
        document.getElementById('editProfile').style.display = "block";
        document.getElementById('procEditProfile').style.display = "none";

        document.getElementById('usernameInput').style.display = "inline-block";
        document.getElementById('username').style.display = "none";

        document.getElementById('occupationInput').style.display = "inline-block";
        document.getElementById('occupation').style.display = "none";

        document.getElementById('hobbyInput').style.display = "inline-block";
        document.getElementById('hobby').style.display = "none";

        document.getElementById('statusmsgInput').style.display = "inline-block";
        document.getElementById('statusmessage').style.display = "none";
    }

    const onEditProfileClick = async () => {
        const userData = doc(firestore, `userData/${auth.currentUser.uid}`);
        await setDoc(userData, {
            username: document.getElementById('usernameInput').value,
            occupation: document.getElementById('occupationInput').value,
            hobby: document.getElementById('hobbyInput').value,
            statusmessage: document.getElementById('statusmsgInput').value,
        }, { merge: true });

        document.getElementById('editProfile').style.display = "none";
        document.getElementById('procEditProfile').style.display = "block";

        document.getElementById('usernameInput').style.display = "none";
        document.getElementById('username').innerText = '닉네임: ' + document.getElementById('usernameInput').value;
        document.getElementById('username').style.display = "block";

        document.getElementById('occupationInput').style.display = "none";
        document.getElementById('occupation').innerText = '직업: ' + document.getElementById('occupationInput').value;
        document.getElementById('occupation').style.display = "block";

        document.getElementById('hobbyInput').style.display = "none";
        document.getElementById('hobby').innerText = '취미: ' + document.getElementById('hobbyInput').value;
        document.getElementById('hobby').style.display = "block";

        document.getElementById('statusmsgInput').style.display = "none";
        document.getElementById('statusmessage').innerText = document.getElementById('statusmsgInput').value;
        document.getElementById('statusmessage').style.display = "block";

    }

    const searchOtherUser = async () => {
        const targetUsername = document.getElementById('searchUID').value;
        const userData = collection(firestore, 'userData');
        const q = query(userData, where("username", "==", targetUsername));
        const querySnapshot = await getDocs(q);
        var gottenURI;
        querySnapshot.forEach((docu) => {
            gottenURI = docu.id;
            return;
        });
        location.href = `/otherworld?uid=${gottenURI}`;
    }
    

    btnLogout.addEventListener("click", logout);
    procEditProfile.addEventListener("click", onProcEditProfileClick);
    editProfile.addEventListener("click", onEditProfileClick);
    btnSearch.addEventListener("click", searchOtherUser);
});