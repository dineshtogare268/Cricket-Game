const bat = document.querySelector("#bat");
const ball = document.querySelector("#ball");
const stump = document.querySelector("#stump");

const userWon = document.querySelector("#user-move");
const compWon = document.querySelector("#computer-move");
const tie = document.querySelector("#tie");
const gameScore = document.querySelector("#score");

const winnerMsg = document.querySelector("#winnerMsg");

const resetBtn = document.querySelector("#reset");

// ******* Score Updated Win, Lost, Tie *******

let scoreStr = localStorage.getItem("Score");

let score = scoreStr
  ? JSON.parse(scoreStr)
  : {
      userScore: 0,
      compScore: 0,
      drawScore: 0,
    };

const displayUserScore = () => {
  score.userScore++;
  userWon.innerText = `User win ${score.userScore}`;
  userWon.style.color = "green";
  showResult();
};

const displayComputerWinScore = () => {
  score.compScore++;
  compWon.innerText = `Computer Won ${score.compScore}`;
  compWon.style.color = "red";
  showResult();
};

const displayDrawScore = () => {
  score.drawScore++;
  tie.innerText = `Its was Tie ${score.drawScore}`;
  tie.style.color = "blue";
  showResult();
};

// ******* Generate Computer Choice *******

const generateComputerChoice = () => {
  let randomNumber = Math.random() * 3;

  if (randomNumber > 0 && randomNumber <= 1) {
    return "Bat";
  } else if (randomNumber > 1 && randomNumber <= 2) {
    return "Ball";
  } else {
    return "Stump";
  }

  return choice;
};

// ***** Show Final Result on Screen *****

const showResult = (userMove, computerMove, result) => {
  localStorage.setItem("Score", JSON.stringify(score));

  winnerMsg.innerText = `
  Your Choice is ${userMove}
         and 
  Computer choice is ${computerMove} 

   Result => ** ${result} **`;
};

// ***** Get User Move and Computer Move Result *****

const getResult = (userMove, computerMove) => {
  if (userMove === "Bat") {
    if (computerMove === "Ball") {
      displayUserScore();
      return `User Won`;
    } else if (computerMove === "Stump") {
      displayComputerWinScore();
      return `Computer Win`;
    } else {
      displayDrawScore();
      return `Tie`;
    }
  } else if (userMove === "Ball") {
    if (computerMove === "Ball") {
      displayDrawScore();
      return `Tie`;
    } else if (computerMove === "Bat") {
      displayComputerWinScore();
      return `Computer Win`;
    } else {
      displayUserScore();
      return `User Won`;
    }
  } else if (userMove === "Stump") {
    if (computerMove === "Stump") {
      displayDrawScore();
      return `Tie`;
    } else if (computerMove === "Bat") {
      displayUserScore();
      return `User  Win`;
    } else {
      displayComputerWinScore();
      return `Computer Won`;
    }
  }
};

// //  ***** Bat Button *****

bat.addEventListener("click", () => {
  let computerChoice = generateComputerChoice();
  let resultMsg = getResult("Bat", computerChoice);
  showResult("Bat", computerChoice, resultMsg);
});

//  ***** Ball Button *****

ball.addEventListener("click", () => {
  let computerChoice = generateComputerChoice();
  resultMsg = getResult("Ball", computerChoice);

  showResult("Ball", computerChoice, resultMsg);
});

//  ***** Stump Button *****

stump.addEventListener("click", () => {
  let computerChoice = generateComputerChoice();
  resultMsg = getResult("Stump", computerChoice);
  showResult("Stump", computerChoice, resultMsg);
});

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  resetScore();
});
