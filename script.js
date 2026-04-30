const gameArea = document.getElementById("gameArea");

const cat = document.getElementById("cat");

/* =========================
   PISICA CARE INCURCA
========================= */

setInterval(() => {

    cat.style.bottom = "20px";

    document.body.classList.add("flash");

    setTimeout(() => {

        cat.style.bottom = "-250px";

        document.body.classList.remove("flash");

    },2500);

},10000);

/* =========================
   REACTION GAME
========================= */

function reactionGame(){

    gameArea.innerHTML = `
        <h1>Reaction Time</h1>

        <p id="reactionText">
            Așteaptă verde...
        </p>

        <div id="reactionBox"></div>
    `;

    const box =
        document.getElementById("reactionBox");

    const text =
        document.getElementById("reactionText");

    box.style.background = "#ff2f92";

    let startTime;

    setTimeout(() => {

        box.style.background = "#00ff88";

        text.innerHTML = "CLICK!";

        startTime = Date.now();

    },Math.random()*4000+2000);

    box.onclick = () => {

        if(box.style.background === "rgb(0, 255, 136)"){

            const reaction =
                Date.now() - startTime;

            text.innerHTML =
                "Timpul tău: " + reaction + " ms";

        }

    };

}

/* =========================
   MEMORY GAME
========================= */

function memoryGame(){

    const emojis = [
        "🐱","🐶","🐭","🐹",
        "🐱","🐶","🐭","🐹"
    ];

    emojis.sort(() => Math.random() - 0.5);

    gameArea.innerHTML = `
        <h1>Memory Game</h1>

        <div class="memory-grid"></div>
    `;

    const grid =
        document.querySelector(".memory-grid");

    let first = null;

    let second = null;

    emojis.forEach(emoji => {

        const card =
            document.createElement("div");

        card.className = "memory-card";

        card.innerHTML = "?";

        card.onclick = () => {

            if(card.innerHTML !== "?")
                return;

            card.innerHTML = emoji;

            if(!first){

                first = card;

            }else{

                second = card;

                if(first.innerHTML ===
                    second.innerHTML){

                    first = null;
                    second = null;

                }else{
                   
                    
                    setTimeout(() => {

                        first.innerHTML = "?";

                        second.innerHTML = "?";

                        first = null;

                        second = null;

                    },800);

                }

            }

        };

        grid.appendChild(card);

    });

}

/* =========================
   AIM GAME
========================= */

function aimGame(){

    let score = 0;

    gameArea.innerHTML = `
        <h1>Aim Trainer</h1>

        <h2>
            Scor:
            <span id="score">0</span>
        </h2>
    `;

    spawnTarget();

    function spawnTarget(){

        const target =
            document.createElement("div");

        target.className = "target";

        target.style.left =
            Math.random() *
            (window.innerWidth - 100)
            + "px";

        target.style.top =
            Math.random() *
            (window.innerHeight - 100)
            + "px";

        document.body.appendChild(target);

        target.onclick = () => {

            score++;

            document.getElementById("score")
                .innerHTML = score;

            target.remove();

            spawnTarget();

        };

    }

}

/* =========================
   SEQUENCE GAME
========================= */

function sequenceGame(){

    gameArea.innerHTML = `
        <h1>Sequence Memory</h1>

        <p>
            În curând...
        </p>
    `;

}

function angryCat(){
    // arata pisica
    cat.style.bottom = "20px";

    //animatie laba
    cat.classList.add("cat-angry");

    //sunet MIAU
    meow.pause();
    meow.currentTime = 0;

    let playPromise = meow.play();

    if (playPromise !==undrfined) {
        playPromise.catch(() => {
            console.log("Sunet blocat de browser(click necesar)");
        });
    }

    //dispare
    setTimeout(() => {
       cat.style.bottom = "-250px";
       cat.classList.remove("cat-angry");
    }, 2000);

    
}