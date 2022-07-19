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

	const giveCoins = async (value) => {
		const userData = doc(firestore, `userData/${user.uid}`);
        await updateDoc(userData, { 
            currency: increment(value)
        });
	}

	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");

	const chr = new Image(); // 세팅 버튼
	chr.src = 'ninja.png';

	//ar chr = document.getElementById("ninja.png");


	var b_list = [ [0, 0, 2, 2] ]; // 생성시 x좌표, 생성시 y좌표, x방향, y방향
	var bullet_r = 2;
	var b_count = 1;

	var buffer =  [ 0, 0, 0, 0 ];
	var character = [800/2-5, 600/2-5, 32];

	setInterval(update, 10);

	var time = 0;

	function gameInit(){
		b_list = [ [0, 0, 2, 2] ];
		b_count = 1;
		buffer =  [ 0, 0, 0, 0 ];
		character = [800/2-5, 600/2-5, 32]; // 초기 캐릭터 위치 설정
		time = 0;
	}

	function drawBackground(ctx){
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 800, 600);
		ctx.fill();
	}

	function checkCrash(x, y){
		var c_r = character[2];
		var c_x = character[0] + c_r/2;
		var c_y = character[1] + c_r/2;
		

		if( (x-c_x)*(x-c_x) + (y-c_y)*(y-c_y)  < (c_r/3)*(c_r/3) )
			return 1;
		else return 0;
	}

	function drawBullet(b_count, ctx){	
		for(var i=0;i<b_count;i++){
			ctx.beginPath();

			b_list[i][0]+=b_list[i][2];
			b_list[i][1]+=b_list[i][3];



			if(b_list[i][0] > 800){
				b_list[i][0] = 800;
				b_list[i][2] *= -1;
				b_list[i][3] += Math.random()%2;
			}
			if(b_list[i][0] < 0){
				b_list[i][0] = 0;
				b_list[i][2] *= -1;
				b_list[i][3] += Math.random()%2;
			}
			if(b_list[i][1] > 600){
				b_list[i][1] = 600;
				b_list[i][3] *= -1;
				b_list[i][2] += Math.random()%2;
			}
			if(b_list[i][1] < 0){
				b_list[i][1] = 0;
				b_list[i][3] *= -1;
				b_list[i][2] += Math.random()%2;
			}

			if(checkCrash(b_list[i][0], b_list[i][1])){
				const coinAmount = parseInt(time*time/300000);
				giveCoins(coinAmount);
				alert("포인트를 " + coinAmount + " 만큼 얻으셨습니다.");
				gameInit();
			}

			ctx.fillStyle = "white";
			ctx.arc(b_list[i][0], b_list[i][1], bullet_r, 0 , 2*Math.PI);
			ctx.fill();
		}
	}

	function makeBullet(){
		if(time%30==0){
			var type = Math.floor(Math.random()*4);
			var dir;
			if( (Math.floor(Math.random()*100))%2 == 0 )
				dir = 1;
			else 
				dir = -1;
		//alert(type);
			if(type == 0)
				b_list[b_count] = [Math.floor(Math.random()*800), 2, dir*2, 2];
			else if(type == 1)
				b_list[b_count] = [Math.floor(Math.random()*800), 598, dir*2, -2];
			else if(type == 2)
				b_list[b_count] = [2, Math.floor(Math.random()*600), 2, dir*2];
			else
				b_list[b_count] = [798, Math.floor(Math.random()*600), -2, dir*2];
			
			b_count+=0.5; // 총알이 생성되는 속도
		}
	}

	function moveCharater(){
		if(buffer[0] == 1 && character[1] >= 2) character[1]-=2;
		if(buffer[1] == 1 && character[1] <=566 ) character[1]+=2;
		if(buffer[2] == 1 && character[0] >= 2) character[0]-=2;
		if(buffer[3] == 1 && character[0] <=766) character[0]+=2;
	}

	function drawCharacter(){
		c.beginPath();
		//ctx.fillStyle = "white";
		//ctx.arc(character[0]+7, character[1]+7, character[2], 0 , 2*Math.PI);
		//ctx.fill();

		c.beginPath();
		c.drawImage(chr, character[0], character[1], 32, 32);
		c.fill();
	}

	function drawScore(){
		c.beginPath();
		c.fillStyle = "white";
		c.translate(100, 50);
		c.font = 20 + "px arial";
		c.textBaseline="middle";
		c.textAlign="center";
		c.fillText("Time : " + (time/100).toString() + "sec", 0, 0);
		c.fill();
		c.translate(-100, -50);
	}

	function update() {
		time = time+1;
		drawBackground(c);
		drawBullet(b_count, c);
		moveCharater();
		drawCharacter();
		drawScore();
		makeBullet();
	}



	window.addEventListener('keydown', (e) =>{ // 키가 입력되었는가?
		switch (e.key){
			case 'w':
				buffer[0]=1;
				break
			case 'a':
				buffer[2]=1;
				break
			case 's':
				buffer[1]=1;
				break
			case 'd':
				buffer[3]=1;
				break
		}
		//console.log(keys);
	})

	window.addEventListener('keyup', (e) =>{ // 키가 입력되었는가?
		switch (e.key){
			case 'w':
				buffer[0]=0;
				break
			case 'a':
				buffer[2]=0;
				break
			case 's':
				buffer[1]=0;
				break
			case 'd':
				buffer[3]=0;
				break
		}
		//console.log(keys);
	});

	/*
	function keyup(){
		if(event.keyCode == 38) buffer[0] = 0;
		if(event.keyCode == 40) buffer[1] = 0;
		if(event.keyCode == 37) buffer[2] = 0;
		if(event.keyCode == 39) buffer[3] = 0;
	}
	function keydown(){
		if(event.keyCode == 38) buffer[0] = 1;
		if(event.keyCode == 40) buffer[1] = 1;
		if(event.keyCode == 37) buffer[2] = 1;
		if(event.keyCode == 39) buffer[3] = 1;
	}*/


});




