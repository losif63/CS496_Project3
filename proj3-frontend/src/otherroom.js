import { collisions } from './collisions.js'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, query, addDoc, getDocs, getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';


const firebaseApp = initializeApp({
    apiKey: "AIzaSyAu9Uk0w0SzdoMrGhz_gOWlnRLmYA5b8Oo",
    authDomain: "mdcmpwrld.firebaseapp.com",
    projectId: "mdcmpwrld",
    storageBucket: "mdcmpwrld.appspot.com",
    messagingSenderId: "216385430089",
    appId: "1:216385430089:web:1820c6d1d8d96699cf1598"
});

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const canvas = document.querySelector('canvas'); // index.html의 canvas를 불러옴
const c = canvas.getContext('2d'); // context는 많이 쓰기 때문에 c라는 변수로 사용
canvas.width = 480; // 12 * 20 * 2
canvas.height = 240; // 12 * 20 * 2
let TILES = 20; // 가로세로 타일수
let SIZE = 24; // 타일 하나의 사이즈
let mappaths = ['map1.png', 'map2.png', 'map3.png', 'map4.png', 'map5.png', 'map6.png'];
let lockedmappaths = ['map1_locked.png', 'map2_locked.png', 'map3_locked.png', 'map4_locked.png', 'map5_locked.png', 'map6_locked.png'];
let checkedmappaths = ['map1_checked.png', 'map2_checked.png', 'map3_checked.png', 'map4_checked.png', 'map5_checked.png', 'map6_checked.png'];
let mapimg = [];
let lockedmapimg = [];
let checkedmapimg = [];
let setX = [32, 176, 320, 32, 176, 320];
let setY = [72, 72, 72, 144, 144, 144];

let inventory = [2, 0, 0, 0, 0, 0]; 
let currency = 0;
let mapnum = 0;

let windownum = 0; // 몇 번째 창을 켜고 있는가?

let cMAP =[]; // collision 정보들의 배열
let cB = []; // 만들어진 boundary들의 배열

let newback = 0;




console.log('This is otherworld!');
console.log('Getting: ' + uid);

/***************************************************************************************************/

/*function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect(); //viewport 기준으로 나의 위치 알려줌
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
*/

// How to get currency & inventory
console.log('current uid: ' + uid);
const infoquery = query(doc(firestore, `userData/${uid}`));
const infoquerySnapshot = getDoc(infoquery);
infoquerySnapshot.then((docu) => {
    console.log('current inventory: ' + docu.get('inventory'));
    inventory = docu.get('inventory');
    for(let i=0;i<inventory.length;i++){
        if(inventory[i]==2){
            mapnum=i;
            break;
        }
    }
    console.log(inventory);
    console.log("현재 맵:" ,mapnum);


    for(let j=0;j<mappaths.length;j++){
        const collisionsMap = [];
        for(let i=0; i<collisions[j].length; i+=TILES){ // 가로 타일이 60개이기 때문
            collisionsMap.push(collisions[j].slice(i, TILES+i));
        }
        cMAP.push(collisionsMap);
    }

    

    class Boundary{
        static width = SIZE
        static height = SIZE
        constructor({position}){
            this.position = position
            this.width = SIZE
            this.height = SIZE // 타일 하나당 32 by 32로 표기되기 때문
        }
        
        draw(){
            c.fillStyle ='red';
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
    }

    for(let i=0;i<mappaths.length;i++){
        const boundaries = [];
        cMAP[i].forEach((row, i) =>{
            row.forEach((symbol, j) =>{
                //console.log(symbol);
                if(symbol > canvas.width){
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width,
                                y: i * Boundary.height
                            }
                        })
                    )               
                }
            })
        })
        cB.push(boundaries);
    }

    console.log(cB);
    //console.log(boundaries);

    //c.fillStyle = 'white';
    //c.fillRect(0, 0, canvas.width, canvas.height);

    //맵 집어넣기

    for(let i=0;i<mappaths.length;i++){
        mapimg.push(new Image());
        mapimg[i].src = mappaths[i];
        lockedmapimg.push(new Image());
        lockedmapimg[i].src = lockedmappaths[i];
        checkedmapimg.push(new Image());
        checkedmapimg[i].src = checkedmappaths[i];
    }
    //const image = new Image(); // 배경
    //image.src = mappaths[mapnum]; // 원래 더 큰 이미지, 작은 canvas 사이즈로 시야이동도 구현 가능

    const playerImage = new Image(); // 플레이어 이미지 만들기
    playerImage.src = 'Girl-Sheet.png';
    //console.log(collisions);

    const setimg = new Image(); // 세팅 버튼
    setimg.src = 'settings.png';

    const setbackimg = new Image();
    setbackimg.src = 'settingback.png';

    const gotchaimg = new Image();
    gotchaimg.src = 'gotcha.png';

    const bangbg = new Image();
    bangbg.src = 'bang.png';

    const congbg = new Image();
    congbg.src = 'gotcha_back.png'

    //image.onload = () => {
        
    //}




    let cropx = 0, cropy = 0;
    // girl은 24*24 이미지로 되어있음

    class Character{
        constructor({position, velocity}){
            this.position = position
        }

        draw() {
            c.drawImage(
                playerImage, // 이미지 선택
                parseInt(cropx/6)*24 + cropy*24*4, // crop 시작할 x, y좌표
                0,
                playerImage.width/48, // crop할 사이즈의 x, y좌표
                playerImage.height,
                this.position.x, // 실제로 그릴 x, y 좌표
                this.position.y,
                SIZE, // 표시될 이미지의 x사이즈
                SIZE, // 표시될 이미지의 y사이즈
            );
        }
    }
    //console.log(playerImage.width);

    const chr = new Character({
        position:{
            x:50,
            y:100
        }
    })



    let lastKey=''; // 마지막으로 눌린 키

    const keys = {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        s: {
            pressed: false
        },
        d: {
            pressed: false
        }
    }

    let notmove = [0, 0, 0, 0]; // 0: 해당방향 이동가능, 1: 이동불가

    function isinsquare(x, y, bx, by , sz){
        
        if(x+12>=bx && x<=bx+sz && y+12>=by && y<=by+sz) {
            //console.log([x, y, bx, by]);
            return 1;
        }
        else return 0;
    }

    function checkmov(){ // 현재 height=32, width=32인 상태
        notmove[0]=0
        notmove[1]=0
        notmove[2]=0
        notmove[3]=0
        //console.log(mapnum);
        cB[mapnum].forEach(boundary => {
            let bx = boundary.position.x;
            let by = boundary.position.y;
            let x = chr.position.x+8;
            let y = chr.position.y+8;
            if(isinsquare(x-5, y, bx, by, SIZE)===1){ // a
                notmove[1] = 1;
            }

            if(isinsquare(x+5, y, bx, by, SIZE)===1){ // d
                notmove[3] = 1;
            }

            if(isinsquare(x, y-5, bx, by, SIZE)===1){ // w
                notmove[0] = 1;
            }

            if(isinsquare(x, y+5, bx, by, SIZE)===1){ // s
                notmove[2] = 1;
            }

        })

        //console.log(notmove);
    }

    function animate(){
        
        window.requestAnimationFrame(animate); // 재귀 호출
        //console.log(canvas.width);
        if(windownum == 0){

            c.drawImage(mapimg[mapnum], 0, 0);
            /*boundaries.forEach(boundary => {
                boundary.draw();
            })*/ // boundary 체크
            chr.draw();
            

            //백그라운드가 움직이게 하는 부분
            // 만약 사선 무빙을 막고 싶다면 lastkey를 체크
            
            
            if(keys.w.pressed && lastKey === 'w'){
                checkmov();
                cropx = (cropx + 1)%24;
                cropy = 3;
                //background.position.y += 5;   
                //console.log("w pressed");

                if(notmove[0] == 0) chr.position.y -= 3;
            }
            if(keys.a.pressed&& lastKey === 'a'){
                checkmov();
                cropx = (cropx + 1)%24;
                cropy = 1;
                //background.position.x += 5;
                if(notmove[1] == 0) chr.position.x -= 3;
            }
            if(keys.s.pressed&& lastKey === 's'){
                checkmov();
                cropx = (cropx + 1)%24;
                cropy = 0;
                //background.position.y -= 5;
                if(notmove[2] == 0) chr.position.y += 3;
            }
            if(keys.d.pressed&& lastKey === 'd'){
                checkmov();
                cropx = (cropx + 1)%24;
                cropy = 2;
                //background.position.x -= 5;
                if(notmove[3] == 0) chr.position.x += 3;
            }

            
            //c.font("40pt Fira");
            //c.drawImage(setimg, 0, 0, 25, 25);

        }

        else if(windownum == 1){
            c.drawImage(setbackimg, 0, 0, 480, 240);
            for(let i=0;i<6;i++){
                if(inventory[i]==0){
                    c.drawImage(lockedmapimg[i], setX[i], setY[i], 128, 64);
                }
                else if(inventory[i]==1){
                    c.drawImage(mapimg[i], setX[i], setY[i], 128, 64);
                }
                else if(inventory[i]==2){
                    c.drawImage(checkedmapimg[i], setX[i], setY[i], 128, 64);
                }
            }

            c.drawImage(gotchaimg, 400, 10, 48, 48);
            //c.drawImage(mapimg[0], 32, 72, 128, 64);
            //c.drawImage(mapimg[1], 176, 72, 128, 64);
            //c.drawImage(mapimg[2], 320, 72, 128, 64);
            //c.drawImage(mapimg[3], 32, 152, 128, 64);
            //c.drawImage(mapimg[4], 176, 152, 128, 64);
            //c.drawImage(mapimg[5], 320, 152, 128, 64);
            //c.drawImage(setimg, 0, 0, 25, 25);
        }
        else if(windownum == 2){
            c.drawImage(bangbg, 0, 0, 480, 240);
        }
        else if (windownum == 3){
            c.drawImage(congbg, 0, 0, 480, 240);
            c.drawImage(mapimg[newback], 190, 60, 240, 120);
        }

    }
    
    animate();


    window.addEventListener('keydown', (e) =>{ // 키가 입력되었는가?
        switch (e.key){
            case 'w':
                keys.w.pressed = true
                lastKey = 'w';
                break
            case 'a':
                keys.a.pressed = true
                lastKey = 'a';
                break
            case 's':
                keys.s.pressed = true
                lastKey = 's';
                break
            case 'd':
                keys.d.pressed = true
                lastKey = 'd';
                break
        }
        //console.log(keys);
    })

    window.addEventListener('keyup', (e) =>{ // 키가 입력되었는가?
        switch (e.key){
            case 'w':
                keys.w.pressed = false
                break
            case 'a':
                keys.a.pressed = false
                break
            case 's':
                keys.s.pressed = false
                break
            case 'd':
                keys.d.pressed = false
                break
        }
        //console.log(keys);
    });
    
});

    
    
    
    
    // How to set currency & inventory

/***************************************************************************************************/


