const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft:document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        curretTime: 60,
        life: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),

    }
}
function countDown(){
    state.values.curretTime--;
    state.view.timeleft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O resultado foi: " + state.values.result);
        resetGame();
        // state.values.life = 3;
        // state.view.life.textContent = state.values.life;
        // state.values.curretTime = 60;
        // state.view.timeleft.textContent = state.values.curretTime;
        // state.values.result = 0;
        // state.view.score.textContent = state.values.result;
    }
}

function resetGame() {
    state.values.life = 3;
    state.view.life.textContent = state.values.life;
    state.values.curretTime = 60;
    state.view.timeleft.textContent = state.values.curretTime;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.actions.timeId = setInterval(randomSquare, 1000);
    state.actions.countDownTimeId = setInterval(countDown, 1000);
}

function loseLife() {
        if (state.values.life > 0) {
            state.values.life--;
            state.view.life.textContent = state.values.life; 
            console.log("Você perdeu uma vida! Restam " + state.values.life + " vidas.");
        } else {
            clearInterval(state.actions.countDownTimeId);
            clearInterval(state.actions.timeId);
            alert("Game over! O resultado foi: " + state.values.result);
            resetGame();
        }
     }

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp4`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                loseLife();
            }
        })
    });
}

function init() {
       addListenerHitBox();
      
}
init();

