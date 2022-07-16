const canvas = document.querySelector('canvas'); // index.html의 canvas를 불러옴
const c = canvas.getContext('2d'); // context는 많이 쓰기 때문에 c라는 변수로 사용
canvas.width = 480; // 12 * 20 * 2
canvas.height = 240; // 12 * 20 * 2
let TILES = 20; // 가로세로 타일수
let SIZE = 24; // 타일 하나의 사이즈
let mappaths = ['./images/icemap.png', './images/protomap.png'];
let mapnum = 0;

const collisionsMap = [];
for(let i=0; i<collisions[mapnum].length; i+=TILES){ // 가로 타일이 60개이기 때문
    collisionsMap.push(collisions[mapnum].slice(i, TILES+i));
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

const boundaries = [];

collisionsMap.forEach((row, i) =>{
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
console.log(boundaries);

//c.fillStyle = 'white';
//c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image(); // 배경
image.src =  mappaths[mapnum]; // 원래 더 큰 이미지, 작은 canvas 사이즈로 시야이동도 구현 가능

const playerImage = new Image(); // 플레이어 이미지 만들기
playerImage.src = './images/Girl-Sheet.png';
//console.log(collisions);

//image.onload = () => {
    
//}

class Sprite{
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}
 
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    image: image // 배경 이미지 넘겨주기
})


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
console.log(playerImage.width);

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
        console.log([x, y, bx, by]);
        return 1;
    }
    else return 0;
}

function checkmov(){ // 현재 height=32, width=32인 상태
    notmove[0]=0
    notmove[1]=0
    notmove[2]=0
    notmove[3]=0
    boundaries.forEach(boundary => {
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

    console.log(notmove);
}

function animate(){
    window.requestAnimationFrame(animate); // 재귀 호출
    
    background.draw();
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
        console.log("w pressed");

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
    console.log(keys);
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
    console.log(keys);
})


