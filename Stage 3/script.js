const quizForm = document.getElementById("quiz-form");
const questionList = document.getElementById("question-list");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const winnerMessage = document.getElementById("winner-message");

let questions = [];
let player1Points = 0;
let player2Points = 0;

function addQuestion() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const option3 = document.getElementById("option3").value;
  const option4 = document.getElementById("option4").value;
  const correctAnswer = document.getElementById("correct-answer").value;

  const newQuestion = {
    question,
    options: [option1, option2, option3, option4],
    correctAnswer,
  };

  questions.push(newQuestion);
  renderQuestions();
  quizForm.reset();
}

function renderQuestions() {
  questionList.innerHTML = "";
  questions.forEach((q, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("question");
    listItem.textContent = `Q${index + 1}: ${q.question}`;
    questionList.appendChild(listItem);
  });
}

function revealAnswers() {
  questions.forEach((q, index) => {
    const correctAnswerIndex = parseInt(q.correctAnswer) - 1;
    const options = [...q.options];
    const correctOption = options[correctAnswerIndex];

    options.sort(() => Math.random() - 0.5);

    const listItem = questionList.children[index];
    listItem.textContent = `Q${index + 1}: ${
      q.question
    } - Options: ${options.join(", ")} | Correct Answer: ${correctOption}`;
  });
}

function updateScore(player, action) {
  if (player === "player1") {
    if (action === "correct") {
      player1Points++;
    } else {
      player2Points++;
    }
  } else {
    if (action === "correct") {
      player2Points++;
    } else {
      player1Points++;
    }
  }

  player1Score.textContent = player1Points;
  player2Score.textContent = player2Points;

  if (player1Points === 10 || player2Points === 10) {
    endGame();
  }
}

function endGame() {
  const winner = player1Points === 10 ? "Player 1" : "Player 2";
  winnerMessage.textContent = `${winner} wins the game!`;
}
