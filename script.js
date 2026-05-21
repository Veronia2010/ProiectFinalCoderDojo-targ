/* =========================
REACTION GAME (14 pisici)
========================= */
function reactionGame(){

gameArea.innerHTML = `
    <h1>Reaction Game</h1>
    <p id="reactionText">Așteaptă verde...</p>
    <div id="reactionBox"></div>
`;

const box = document.getElementById("reactionBox");
const text = document.getElementById("reactionText");

box.style.width = "300px";
box.style.height = "300px";
box.style.background = "#ff2f92";
box.style.position = "relative";

let startTime;
let isGreen = false;

setTimeout(() => {

    box.style.background = "#00ff88";
    text.innerHTML = "CLICK!";
    isGreen = true;
    startTime = Date.now();

}, Math.random() * 4000 + 2000);

box.onclick = () => {

    if(!isGreen) return;

    const reaction = Date.now() - startTime;

    let catImage = "";

    if(reaction <= 200){
        catImage = "images/cat1.png.jpeg";
    } else if(reaction <= 400){
        catImage = "images/cat2.png.jpeg";
    } else if(reaction <= 600){
        catImage = "images/cat3.png.jpeg";
    } else if(reaction <= 800){
        catImage = "images/cat4.png.jpeg";
    } else if(reaction <= 1000){
        catImage = "images/cat5.png.jpeg";
    } else if(reaction <= 1200){
        catImage = "images/cat6.png.jpeg";
    } else if(reaction <= 1400){
        catImage = "images/cat7.png.jpeg";
    } else if(reaction <= 1600){
        catImage = "images/cat8.png.jpeg";
    } else if(reaction <= 1800){
        catImage = "images/cat9.png.jpeg";
    } else if(reaction <= 2000){
        catImage = "images/cat10.png.jpeg";
    } else if(reaction <= 2300){
        catImage = "images/cat11.png.jpeg";
    } else if(reaction <= 2600){
        catImage = "images/cat12.png.jpeg";
    } else if(reaction <= 3000){
        catImage = "images/cat13.png.jpeg";
    } else {
        catImage = "images/cat14.png.jpeg";
    }

    // 🔥 IMPORTANT: curățăm imaginea veche
    box.innerHTML = "";

    const img = document.createElement("img");
    img.src = catImage;
    img.style.width = "200px";
    img.style.position = "absolute";
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%)";

    box.appendChild(img);

    text.innerHTML = "Timp: " + reaction + " ms";

    isGreen = false;
};
}

/* =========================
   MOUSE GAME
========================= */
function aimGame(){

gameArea.innerHTML = `
    <h1>Mouse Game 🐭</h1>
    <h2>Scor: <span id="score">0</span></h2>

    <div id="playArea"></div>
`;

let score = 0;

const area = document.getElementById("playArea");

area.style.width = "400px";
area.style.height = "400px";
area.style.background = "#ff4fa0";
area.style.position = "relative";
area.style.margin = "20px auto";
area.style.borderRadius = "20px";

const mouse = document.createElement("div");
mouse.innerText = "🐭";
mouse.style.position = "absolute";
mouse.style.fontSize = "40px";
mouse.style.cursor = "pointer";
mouse.style.userSelect = "none";

area.appendChild(mouse);

function moveMouse(){

    const rect = area.getBoundingClientRect();

    const x = Math.random() * (rect.width - 50);
    const y = Math.random() * (rect.height - 50);

    mouse.style.left = x + "px";
    mouse.style.top = y + "px";
}

mouse.onclick = () => {

    score++;
    document.getElementById("score").innerText = score;

    moveMouse();
};

// start
moveMouse();

// 🔥 mai lent, nu spam
setInterval(moveMouse, 1200);
}

/* =========================
   MEMORY GAME (LEVELS RANDOM)
========================= */

function memoryGame(){

    const baseSets = [
        ["🐱","🐶","🐭","🐹"],
        ["🐸","🐼","🐵","🦊"],
        ["🐺","🐯","🐮","🐷"],
        ["🐰","🐻","🐨","🐙"]
    ];

    let level = 0;

    startLevel();

    function shuffle(arr){
        let a = [...arr];
        for(let i = a.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function generateLevel(){

        const set = baseSets[level % baseSets.length];

        return shuffle([...set, ...set]);
    }

    function startLevel(){

        const emojis = generateLevel();

        gameArea.innerHTML = `
            <h1>Memory Game 🧠</h1>
            <h2>Level ${level + 1}</h2>
            <div class="memory-grid"></div>
        `;

        const grid = document.querySelector(".memory-grid");

        let first = null;
        let second = null;
        let matched = 0;

        emojis.forEach(emoji => {

            const card = document.createElement("div");
            card.className = "memory-card";
            card.innerText = "?";

            card.onclick = () => {

                if(card.innerText !== "?") return;

                card.innerText = emoji;

                if(!first){
                    first = card;
                } else {
                    second = card;

                    if(first.innerText === second.innerText){

                        matched += 2;
                        first = null;
                        second = null;

                        if(matched === emojis.length){

                            setTimeout(() => {
                                level++;
                                startLevel();
                            }, 1000);
                        }

                    } else {

                        setTimeout(() => {
                            first.innerText = "?";
                            second.innerText = "?";
                            first = null;
                            second = null;
                        }, 600);
                    }
                }
            };

            grid.appendChild(card);
        });
    }
}

/* =========================
   SEQUENCE GAME (placeholder)
========================= */

function sequenceGame(){

    const colors = ["red","blue","green","yellow"];

    let sequence = [];
    let player = [];
    let level = 0;
    let canClick = false;

    gameArea.innerHTML = `
        <h1>Sequence Memory</h1>
        <h2>Level: <span id="level">1</span></h2>
        <p id="info">Privește secvența...</p>

        <div id="buttons"></div>
    `;

    const info = document.getElementById("info");
    const levelText = document.getElementById("level");
    const container = document.getElementById("buttons");

    container.style.marginTop = "20px";

    // 🔥 butoane
    colors.forEach(color => {

        const btn = document.createElement("div");
        btn.style.width = "80px";
        btn.style.height = "80px";
        btn.style.display = "inline-block";
        btn.style.margin = "10px";
        btn.style.borderRadius = "10px";
        btn.style.cursor = "pointer";
        btn.style.background = color;
        btn.style.opacity = "0.7";

        btn.onclick = () => {

            if(!canClick) return;

            player.push(color);
            check();
        };

        container.appendChild(btn);
    });

    startLevel();

    function startLevel(){

        canClick = false;
        player = [];

        sequence.push(colors[Math.floor(Math.random() * colors.length)]);

        levelText.innerText = level + 1;

        showSequence();
    }

    function showSequence(){

        info.innerText = "Privește secvența...";

        let i = 0;

        const interval = setInterval(() => {

            flash(sequence[i]);
            i++;

            if(i >= sequence.length){

                clearInterval(interval);

                setTimeout(() => {
                    info.innerText = "Repetă secvența!";
                    canClick = true;
                }, 500);
            }

        }, 800);
    }

    function flash(color){

        const btns = container.children;

        for(let b of btns){

            if(b.style.background === color){

                b.style.opacity = "1";

                setTimeout(() => {
                    b.style.opacity = "0.7";
                }, 300);
            }
        }
    }

    function check(){

        const index = player.length - 1;

        if(player[index] !== sequence[index]){

            gameArea.innerHTML = `
                <h1>GAME OVER ❌</h1>
                <p>Ai ajuns la nivelul ${level + 1}</p>
                <button onclick="sequenceGame()">Restart</button>
            `;
            return;
        }

        if(player.length === sequence.length){

            level++;
            canClick = false;

            setTimeout(startLevel, 1000);
        }
    }
}

/* =========================
 NUMBER MEMORY
========================= */

  function sequenceGame(){

    let level = 1;
    let sequence = [];
    let playerIndex = 0;
    let canClick = false;

    gameArea.innerHTML = `
        <h1 class="game-title">// ===== SEQUENCE MEMORY ===== //</h1>
        <h2>Level: <span id="level">1</span></h2>

        <div id="seqGrid"></div>

        <p id="info">Urmărește secvența...</p>
    `;

    const grid = document.getElementById("seqGrid");
    const info = document.getElementById("info");
    const levelText = document.getElementById("level");

    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 100px)";
    grid.style.gap = "10px";
    grid.style.justifyContent = "center";
    grid.style.marginTop = "20px";

    const colors = ["#ff4fa0", "#ff77c0", "#ff2f92", "#ff99d6", "#ff66b2", "#ff1f7a"];

    let tiles = [];

    function createGrid(){

        grid.innerHTML = "";
        tiles = [];

        for(let i = 0; i < 9; i++){

            const tile = document.createElement("div");
            tile.style.width = "100px";
            tile.style.height = "100px";
            tile.style.background = "#ff4fa0";
            tile.style.borderRadius = "12px";
            tile.style.opacity = "0.6";
            tile.style.cursor = "pointer";

            grid.appendChild(tile);
            tiles.push(tile);

            tile.onclick = () => {

                if(!canClick) return;

                if(tiles.indexOf(tile) === sequence[playerIndex]){

                    playerIndex++;

                    tile.style.background = "lime";

                    if(playerIndex === sequence.length){
                        level++;
                        levelText.innerText = level;

                        setTimeout(startRound, 1000);
                    }

                } else {
                    gameOver();
                }
            };
        }
    }

    function playSequence(){

        canClick = false;
        info.innerText = "Urmărește secvența...";
        let i = 0;

        let interval = setInterval(() => {

            let index = sequence[i];

            tiles[index].style.background = colors[i % colors.length];

            setTimeout(() => {
                tiles[index].style.background = "#ff4fa0";
            }, 400);

            i++;

            if(i >= sequence.length){
                clearInterval(interval);

                setTimeout(() => {
                    canClick = true;
                    playerIndex = 0;
                    info.innerText = "Repetă secvența!";
                }, 500);
            }

        }, 700);
    }

    function startRound(){

        sequence.push(Math.floor(Math.random() * 9));
        createGrid();
        setTimeout(playSequence, 500);
    }

    function gameOver(){

        gameArea.innerHTML = `
            <h1 class="game-title">❌ GAME OVER 🐱</h1>
            <p>Ai ajuns la level ${level}</p>
            <button onclick="sequenceGame()">Restart</button>
        `;
    }

    startRound();
}