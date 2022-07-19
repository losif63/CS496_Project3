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

const canvas = document.querySelector('canvas'); // index.html의 canvas를 불러옴
const c = canvas.getContext('2d'); // context는 많이 쓰기 때문에 c라는 변수로 사용
canvas.width = 720; // 12 * 20 * 2
canvas.height = 960; // 12 * 20 * 2

const eggbg = new Image(); // 세팅 버튼
eggbg.src = 'egg.png';

const eggfin = new Image();
eggfin.src = 'win.gif';


let touch = 4; //원래 1000

let cropx = 0, cropy = 0;
let currency=0;


let gotmoney = 0;

onAuthStateChanged(auth, user => {

    if(user) {
        console.log('Getting: ' + user.uid);
        const infoquery = query(doc(firestore, `userData/${user.uid}`));
        const infoquerySnapshot = getDoc(infoquery);
        infoquerySnapshot.then((docu) => {
            console.log('current money amount: ' + docu.get('currency'));
            currency = docu.get('currency');
        });

        const setData = async (newCurrency) => {
            try {
                const userData = doc(firestore, `userData/${user.uid}`);
                await setDoc(userData, {
                    currency: newCurrency,
                }, { merge: true });
            } catch(error) {
                console.log(`There was an error: ${error}`);
            }
        }

        function animate() {

            window.requestAnimationFrame(animate); // 재귀 호출

            if(touch !=0 ){
                c.drawImage(eggbg, 0, 0, 720, 960);
                c.font = "48px Times New Roman bold";
                c.textAlign = "center";
                c.fillText(touch.toString(), 370, 280);
            }
            else{
                
                c.drawImage(eggfin, 0, 0, 720, 960);

                c.font = "40px Times New Roman bold";
                c.textAlign = "center";
                c.fillText("Press R key to restart", 370, 270);
                
                if(gotmoney==0){
                    gotmoney=1;
                    currency+=100;
                    setData(currency);
                    
                }
                console.log(currency);
            }

            window.addEventListener('keydown', (e) =>{ // 키가 입력되었는가?
                switch (e.key){
                    case 'r':
                        touch = 4; // 원래 1000
                        gotmoney=0;
                        break
                }
                //console.log(keys);
            })
            
        }

        canvas.onclick = function (event) {
            //const cx = event.offsetX;
            //const cy = event.offsetY;
            
            if(touch>0) touch--;
        }



        animate();
    }

});


