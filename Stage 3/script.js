let player1Score = 0;
let player2Score = 0;

function startQuiz() {
  const player1Name = document.getElementById("player1Name").value;
  const player2Name = document.getElementById("player2Name").value;

  document.getElementById(
    "player1"
  ).textContent = `${player1Name}: ${player1Score} points`;
  document.getElementById(
    "player2"
  ).textContent = `${player2Name}: ${player2Score} points`;
}

function updateScore(playerNumber, isCorrect) {
  const player1PointsInput = document.getElementById("player1Points");
  const player2PointsInput = document.getElementById("player2Points");

  if (playerNumber === 1) {
    if (isCorrect) {
      player1Score += 1;
    } else {
      player2Score += 1;
    }
    player1PointsInput.value = player1Score;
  } else if (playerNumber === 2) {
    if (isCorrect) {
      player2Score += 1;
    } else {
      player1Score += 1;
    }
    player2PointsInput.value = player2Score;
  }

  document.getElementById(
    "player1"
  ).textContent = `Player 1: ${player1Score} points`;
  document.getElementById(
    "player2"
  ).textContent = `Player 2: ${player2Score} points`;

  playSound(isCorrect ? "correctSound" : "wrongSound");

  if (player1Score === 10 || player2Score === 10) {
    endQuiz();
  }
}

function endQuiz() {
  alert("Quiz Ended!");
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0;
  sound.play();
}
