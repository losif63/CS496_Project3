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

let gotpoints = 0;
let currency = 0;
let pts=0;

onAuthStateChanged(auth, user => {

    if (user) {
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
            } catch (error) {
                console.log(`There was an error: ${error}`);
            }
        }

        const delay = (n) => new Promise((r) => setTimeout(r, n));
        const createGrid = (width, height) =>
            [...Array(height)].map(() => Array(width).fill(0));

        const canvas = document.getElementById("my-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 936 * 2.4 / 4;
        canvas.height = 956 * 2.28 / 4;

        const gBArrayHeight = 20 * 3 / 4;
        const gBArrayWidth = 12 * 3 / 4;
        const fallingSpeed = 500 * 3 / 4;

        const state = {
            score: 0,
            level: 1,
            time: 0,
            playing: true,
            pos: { x: 4, y: 0 },
            oldCoords: null,
            newCoords: null,
            over: false,
            lock: false,
            winOrLose: "진행 중",
        };

        const toBoardPos = ([x, y]) => [x + state.pos.x, y + state.pos.y];

        const tetrominos = [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ], // T
            [
                [2, 0, 0],
                [2, 2, 2],
                [0, 0, 0],
            ], // L
            [
                [0, 0, 3],
                [3, 3, 3],
                [0, 0, 0],
            ], // J
            [
                [4, 4, 0],
                [4, 4, 0],
                [0, 0, 0],
            ], // O
            [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0],
            ], // S
            [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0],
            ], // Z
            [
                [0, 0, 0, 0],
                [7, 7, 7, 7],
                [0, 0, 0, 0],
            ], // I
        ];

        const tetrominoColors = [
            "white",
            "purple",
            "cyan",
            "blue",
            "yellow",
            "orange",
            "green",
            "red",
        ];

        let curTetromino;
        let curTetrominoColor;

        let nextTetromino;
        let nextTetrominoColor;

        let well = createGrid(gBArrayWidth, gBArrayHeight);

        const setCoords = (tet, pos) =>
            tet.flatMap((row, i) =>
                row.map((tile, j) => ({ x: pos.x + j, y: pos.y + i, z: tile }))
            );

        const removeFromWell = (coords, w) =>
            coords.forEach((c) => c.y >= 0 && c.z && (w[c.y][c.x] = 0));

        const placeOnWell = (coords) =>
            coords.forEach(
                ({ x, y, z }) => 0 <= y && y < gBArrayHeight && z && (well[y][x] = z)
            );

        class LocalStorageManager {
            constructor() {
                this.bestScoreKey = "tetrisBestScore";
                this.storage = window.localStorage;
            }

            getBestScore() {
                return this.storage.getItem(this.bestScoreKey) || 0;
            }

            setBestScore(score) {
                this.storage.setItem(this.bestScoreKey, score);
            }

            setScore(score) {
                this.setBestScore(Math.max(score, this.getBestScore()));
            }
        }

        const storage = new LocalStorageManager();

        const renderWell = () => {
            //     ctx.clearRect(9, 9, 278, 460)
            ctx.fillStyle = "black";
            ctx.fillRect(8 * 3 / 4, 8 * 3 / 4, 280 * 3 / 4, 462 * 3 / 4);
            well.forEach((row, y) =>
                row.forEach((tile, x) => drawTile(x, y, tetrominoColors[tile]))
            );
        };

        function setupCanvas() {
            ctx.scale(2 * 3 / 4, 2 * 3 / 4);

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "black";
            ctx.strokeRect(8 * 3 / 4, 8 * 3 / 4, 280 * 3 / 4, 462 * 3 / 4);

            // Next Tetromino //
            ctx.strokeRect(300 * 3 / 4, 8 * 3 / 4, 161 * 3 / 4, 70 * 3 / 4);

            ctx.fillStyle = "black";
            ctx.font = "16px Arial";

            ctx.fillText("Level", 300 * 3 / 4, 100 * 3 / 4);
            ctx.strokeRect(300 * 3 / 4, 107 * 3 / 4, 161 * 3 / 4, 24 * 3 / 4);
            ctx.fillText(state.level, 310 * 3 / 4, 127 * 3 / 4);

            ctx.fillText("Score", 300 * 3 / 4, 157 * 3 / 4);
            ctx.strokeRect(300 * 3 / 4, 165 * 3 / 4, 161 * 3 / 4, 24 * 3 / 4);

            ctx.fillText("Available Points", 300 * 3 / 4, 220 * 3 / 4);
            ctx.strokeRect(300 * 3 / 4, 225 * 3 / 4, 161 * 3 / 4, 24 * 3 / 4);
            updateScore(state.score);

            ctx.fillText("Statement", 300 * 3 / 4, 271 * 3 / 4);
            ctx.fillText(state.winOrLose, 310 * 3 / 4, 311 * 3 / 4);
            ctx.strokeRect(300 * 3 / 4, 282 * 3 / 4, 161 * 3 / 4, 45 * 3 / 4);

            ctx.fillText("조작법", 300 * 3 / 4, 350 * 3 / 4);
            ctx.strokeRect(300 * 3 / 4, 358 * 3 / 4, 161 * 3 / 4, 112 * 3 / 4);
            ctx.font = "14px Arial";
            ctx.fillText("← : 왼쪽으로", 310 * 3 / 4, 380 * 3 / 4);
            ctx.fillText("→ : 오른쪽으로", 310 * 3 / 4, 400 * 3 / 4);
            ctx.fillText(" ↓  : 아래로", 310 * 3 / 4, 420 * 3 / 4);
            ctx.fillText(" ↑  : 오른쪽 돌림", 310 * 3 / 4, 440 * 3 / 4);
            ctx.fillText("Space: 바로 내림 ", 310 * 3 / 4, 460 * 3 / 4);

            createTetromino();
            drawTetromino();
            renderWell();
        }

        function updateScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "white";
            ctx.fillRect(301 * 3 / 4, 166 * 3 / 4, 159 * 3 / 4, 22 * 3 / 4);
            ctx.fillStyle = "black";
            ctx.fillText(state.score, 310 * 3 / 4, 185 * 3 / 4);

            storage.setScore(state.score);
            ctx.fillStyle = "white";
            ctx.fillRect(301 * 3 / 4, 226 * 3 / 4, 159 * 3 / 4, 22 * 3 / 4);
            ctx.fillStyle = "black";
            //ctx.fillText(storage.getBestScore(), 310, 245);
            ctx.fillText(parseInt(state.score / 3), 310 * 3 / 4, 245 * 3 / 4);
            pts = parseInt(state.score/3);

            state.level = ~~(state.score / 100) + 1;
            ctx.fillStyle = "white";
            ctx.fillRect(301 * 3 / 4, 108 * 3 / 4, 159 * 3 / 4, 22 * 3 / 4);
            ctx.fillStyle = "black";
            ctx.fillText(state.level, 310 * 3 / 4, 127 * 3 / 4);
        }

        function drawTetromino() {
            const coords = setCoords(curTetromino, state.pos);
            coords.forEach(
                ({ x, y, z }) => z && drawTile(x, y, tetrominoColors[z])
            );
        }

        function deleteTetromino() {
            const coords = setCoords(curTetromino, state.pos);
            coords.forEach(({ x, y, z }) => z && drawTile(x, y, "white"));
        }

        function drawNextTetromino() {
            ctx.fillStyle = "white";
            ctx.fillRect(301 * 3 / 4, 9 * 3 / 4, 158 * 3 / 4, 68 * 3 / 4);

            const coords = setCoords(nextTetromino, { x: 14.5 * 3 / 4 - 0.5, y: 0 });
            coords.forEach(
                ({ x, y, z }) => z && drawTile(x, y, tetrominoColors[z])
            );
        }

        function drawTile(x, y, color) {
            const coorX = (x * 23 + 11);
            const coorY = (y * 23 + 10);
            ctx.fillStyle = color;
            ctx.fillRect(coorX, coorY, 21 * 0.85, 21 * 0.85);
        }

        function createTetromino() {
            const randomTetrimino = Math.floor(Math.random() * tetrominos.length);
            const randomNextTetrimino = Math.floor(
                Math.random() * tetrominos.length
            );

            if (!nextTetromino) {
                nextTetromino = tetrominos[randomTetrimino];
                nextTetrominoColor = tetrominoColors[randomTetrimino];
            }

            curTetromino = nextTetromino;
            curTetrominoColor = nextTetrominoColor;

            nextTetromino = tetrominos[randomNextTetrimino];
            nextTetrominoColor = tetrominoColors[randomNextTetrimino];
            drawNextTetromino();
        }

        window.addEventListener("keydown", (e) => {
            if (state.lock) return setTimeout(() => (state.lock = false), 100);

            e.code === "ArrowDown" && canMove("down") && move("down");
            e.code === "ArrowLeft" &&
                !state.over &&
                canMove("left") &&
                move("left");
            e.code === "ArrowRight" &&
                !state.over &&
                canMove("right") &&
                move("right");
            e.code === "ArrowUp" && !state.over && canMove("rotate") && move();
            e.code === "Space" &&
                (async () => {
                    try {
                        while (canMove("down")) await delay(1), move("down");
                    } catch (e) {
                        console.error(e);
                    }
                    state.lock = false;
                })().catch(() => {
                    state.lock = false;
                });
        });

        const canMove = (dir) => {
            const tempWell = JSON.parse(JSON.stringify(well));
            const tempPos = { x: state.pos.x, y: state.pos.y };

            state.oldCoords && removeFromWell(state.oldCoords, tempWell);

            if (dir === "rotate") {
                const flipTet = (t) => t[0].map((c, i) => t.map((t) => t[i]));
                const rotateTet = (t) => flipTet([...t].reverse());
                const tempTet = rotateTet(curTetromino);
                const tempNC = setCoords(tempTet, tempPos);
                const collided = tempNC.some(
                    (c) => c.z && c.y >= 0 && tempWell[c.y][c.x] !== 0
                );
                if (!collided) {
                    curTetromino = rotateTet(curTetromino);
                    return true;
                }
                return false;
            }
            if (dir === "down") {
                tempPos.y += 1;
                const tempNC = setCoords(curTetromino, tempPos);
                const collided = tempNC.some(
                    (c) =>
                        c.z && c.y >= 0 && (!tempWell[c.y] || tempWell[c.y][c.x] !== 0)
                );
                if (
                    state.oldCoords &&
                    collided &&
                    !well[0].slice(4, 7).some((i) => i)
                ) {
                    state.pos = { x: 4, y: -2 };
                    state.newCoords = null;
                    state.oldCoords = null;
                    clearFullRows();
                    createTetromino();
                }
                if (collided && well[0].some((i) => i)) {
                    gameOver();
                    renderWell();
                }
                return !collided;
            }

            if (dir === "left") {
                tempPos.x -= 1;
                const tempNC = setCoords(curTetromino, tempPos).filter(
                    (c) => c.y >= 0
                );
                return !tempNC.some(
                    (c) => c.z && (!tempWell[c.y] || tempWell[c.y][c.x] !== 0)
                );
            }

            if (dir === "right") {
                tempPos.x += 1;
                const tempNC = setCoords(curTetromino, tempPos).filter(
                    (c) => c.y >= 0
                );
                return !tempNC.some(
                    (c) => c.z && (!tempWell[c.y] || tempWell[c.y][c.x] !== 0)
                );
            }

            return true;
        };

        const move = (dir) => {
            if (dir === "down") state.pos.y += 1;
            if (dir === "left") state.pos.x -= 1;
            if (dir === "right") state.pos.x += 1;

            state.newCoords = setCoords(curTetromino, state.pos);
            state.oldCoords && removeFromWell(state.oldCoords, well);
            placeOnWell(state.newCoords);
            state.oldCoords = state.newCoords;
            renderWell();
        };

        const clearFullRows = () =>
        (well = well.reduce(
            (acc, row) =>
                row.every((c) => !!c)
                    ? ((state.score += 10),
                        updateScore(),
                        [Array(gBArrayWidth).fill(0), ...acc])
                    : [...acc, row],
            []
        ));

        const gameOver = () => {
            state.winOrLose = "Game Over!";
            state.over = true;
            if(gotpoints==0){
                gotpoints=1;
                currency += pts;
                setData(currency);
            }
            
            ctx.fillStyle = "white";
            ctx.fillRect(310 * 3 / 4, 283 * 3 / 4, 140 * 3 / 4, 40 * 3 / 4);
            ctx.fillStyle = "black";
            ctx.fillText(state.winOrLose, 310 * 3 / 4, 311 * 3 / 4);
        };

        const freeFall = (t) => {
            if (
                state.playing &&
                t - state.time > Math.max(fallingSpeed - state.level * 25, 150) &&
                state.winOrLose !== "게임 오버"
            ) {
                state.time = t;
                canMove("down") && move("down");
            }

            requestAnimationFrame(freeFall);
        };

        setupCanvas();

        requestAnimationFrame(freeFall);

    }
});