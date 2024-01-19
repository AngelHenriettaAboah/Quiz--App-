let questionsArray = [];
const player1 = {
  name: "",
  score: 0,
  input: document.getElementById("scoreInput1"),
  scoreDisplay: document.getElementById("score1"),
};
const player2 = {
  name: "",
  score: 0,
  input: document.getElementById("scoreInput2"),
  scoreDisplay: document.getElementById("score2"),
};

function updateQuestionList() {
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";

  questionsArray.forEach((q, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Q${index + 1}: ${q.question}`;
    questionList.appendChild(listItem);
  });
}

function addQuestion() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const option3 = document.getElementById("option3").value;
  const option4 = document.getElementById("option4").value;
  const correctAnswer = document.getElementById("correctOption").value;

  const quizItem = {
    question,
    options: [option1, option2, option3, option4],
    correctAnswer,
  };

  questionsArray.push(quizItem);
  displayQuestions();
}

function displayQuestions() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";

  questionsArray.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "quiz-item";

    const questionText = document.createElement("p");
    questionText.textContent = `Q${index + 1}: ${item.question}`;
    div.appendChild(questionText);

    const optionsList = document.createElement("ul");
    item.options.forEach((option, optionIndex) => {
      const li = document.createElement("li");
      li.textContent = `Option ${optionIndex + 1}: ${option}`;
      if (optionIndex + 1 === parseInt(item.correctAnswer.slice(-1))) {
        li.className = "correct-answer";
      } else {
        li.className = "wrong-answer";
      }
      optionsList.appendChild(li);
    });
    div.appendChild(optionsList);

    quizList.appendChild(div);
  });
}

function filterQuestions() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  console.log(questionsArray);
  const filteredQuestions = questionsArray.filter((item) =>
    item.question.toLowerCase().includes(searchInput)
  );
  questionsArray.length = 0;
  questionsArray.push(...filteredQuestions);
  displayQuestions(); //optional parameter could be empty or filled for example filteredQuestion//
}

function startQuiz() {
  const player1Name = document.getElementById("player1Name").value.trim();
  const player2Name = document.getElementById("player2Name").value.trim();

  if (player1Name === "" || player2Name === "") {
    alert("Please enter names for both players.");
    return;
  }

  player1.name = player1Name;
  player2.name = player2Name;

  document.getElementById("player1name").textContent = `${player1.name}: `;
  document.getElementById("player1").style.display = "block";
  document.getElementById("player2name").textContent = `${player2.name}: `;
  document.getElementById("player2").style.display = "block";

  document.getElementById("player1Name").disabled = true;
  document.getElementById("player2Name").disabled = true;

  document.getElementById("player-section").style.background = "#124a13";

  document.getElementById("quiz-end").style.display = "none";

  player1.score = 0;
  player2.score = 0;
  player1.input.value = 0;
  player2.input.value = 0;
  player1.scoreDisplay.textContent = player1.score;
  player2.scoreDisplay.textContent = player2.score;

  document.getElementById("scoreInput1").disabled = false;
  document.getElementById("scoreInput2").disabled = false;
}

function updateScore(playerNumber, isCorrect) {
  const currentPlayer = playerNumber === 1 ? player1 : player2;
  const otherPlayer = playerNumber === 1 ? player2 : player1;

  if (isCorrect) {
    currentPlayer.score += 1;
    currentPlayer.input.value = currentPlayer.score;
    currentPlayer.scoreDisplay.textContent = currentPlayer.score;

    playSound("correctSound");
  } else {
    otherPlayer.score += 1;
    otherPlayer.input.value = otherPlayer.score;
    otherPlayer.scoreDisplay.textContent = otherPlayer.score;

    playSound("wrongSound");
  }

  if (currentPlayer.score === 10 || otherPlayer.score === 10) {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz-end").style.display = "block";

  const winner =
    player1.score === 10
      ? player1.name
      : player2.score === 10
      ? player2.name
      : "No one";
  document.getElementById("winner").textContent = `${winner} Wins!`;

  document.getElementById("scoreInput1").disabled = true;
  document.getElementById("scoreInput2").disabled = true;
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.currentTime = 0;
  sound.play();
}

// Fetch initial questions data from API
fetch(
  "https://raw.githubusercontent.com/AngelHenriettaAboah/AngelHenriettaAboah.github.io/main/json-api/data.json"
)
  .then((response) => response.json())
  .then((data) => {
    // Extract only the title field for simplicity
    questionsArray = data.map((item) => ({
      question: item.question,
      options: item.options.map((opt) => opt.option),
      correctAnswer: item.correctAnswer,
    }));
    displayQuestions();
  })
  .catch((error) =>
    console.log("Error fetching initial questions data:", error)
  );

// Randomly sort the questions
function randomSort() {
  questionsArray.sort(() => Math.random() - 0.5);
  displayQuestions();
}

// Sort the questions alphabetically
function alphabeticalSort() {
  questionsArray.sort((a, b) => a.question.localeCompare(b.question));
  displayQuestions();
}

async function fetchQuestions() {
  try {
    let response = await fetch(
      "https://raw.githubusercontent.com/AngelHenriettaAboah/AngelHenriettaAboah.github.io/main/json-api/data.json"
    );
    let data = await response.json();
    return data.map((item) => ({
      question: item.question,
      options: item.options.map((opt) => opt.option),
      correctAnswer: item.correctAnswer,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}
