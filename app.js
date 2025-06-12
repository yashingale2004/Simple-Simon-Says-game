let gamesequence = [];
let usersequence = [];
let btns = ["yellow", "red", "blue", "green"];
let getStarted = false;
let level = 0;
let p = document.querySelector("p");
let highscore = 0;
document.addEventListener("keypress", function () {
  if (getStarted == false) {
    console.log("game started");
    getStarted = true;
    levelUp();
  }
});

function levelUp() {
  usersequence = [];
  level++;
  p.innerText = `Level : ${level}`;
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  gamesequence.push(randomColor);
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameFlash(randomBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 260);
}

function buttonPress() {
  let btn = this;
  userFlash(btn);
  usersequence.push(btn.getAttribute("id"));
  checkAnswer(usersequence.length - 1);
  //   console.log(usersequence);
}

let allBtns = document.querySelectorAll(".btn");
console.log(allBtns);

for (ele of allBtns) {
  ele.addEventListener("click", buttonPress);
}

function checkAnswer(index) {
  // console.log(`current level : ${level}`);
  if (usersequence[index] == gamesequence[index]) {
    if (usersequence.length == gamesequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    p.innerHTML = `Game over Your Score was <b>${
      level - 1
    }</b> <br> ! Press any key to start`;
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "red";
    }, 150);
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 500);
    score = level - 1;
    let high = document.querySelector("#highscore");
    if (highscore < score) {
      highscore = score;
      high.innerText = `Highest score ${highscore}`;
    }

    reset();
  }
}

function reset() {
  getStarted = false;
  gamesequence = [];
  usersequence = [];
  level = 0;
}
