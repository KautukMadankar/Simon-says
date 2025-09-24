let gameSeq = [];
let userSeq = [];
let btns = ["pink", "yellow", "mud", "blue"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let highscore = 0;

let hs = document.createElement("h2");
        hs.innerHTML = `High Score : ${highscore}`;
        document.body.append(hs);


document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game started");
        started =true;

        LevelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(LevelUp, 1000);
        }
    } else {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        h2.innerHTML = `Game Over! Your Score is ${level}<br> Press any key to start again.`;

        gameReset();
    }
}

function LevelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".box");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress)
};

function gameReset() {
    if(level > highscore) {
        highscore = level;
        hs.innerHTML = `High Score : ${highscore}`;
    }
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};