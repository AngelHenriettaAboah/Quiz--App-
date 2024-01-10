const questionsArray = [];
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

function randomizeOptions() {
  const options = document.querySelectorAll('[name="options"]');
  const optionsArray = Array.from(options);

  optionsArray.sort(() => Math.random() - 0.5);

  optionsArray.forEach((option, index) => {
    option.value = `Random Option ${index + 1}`;
  });
}

function saveQuestion() {
  const question = {
    question: document.getElementById("question").value,
    options: Array.from(document.querySelectorAll('[name="options"]')).map(
      (option) => option.value
    ),
    correctOption: document.querySelector('[name="correctOption"]:checked')
      ?.value,
  };

  question.push(question);
  renderQuestionList();
}

function renderQuestionList() {
  const questionListContainer = document.getElementById("question-list");
  questionListContainer.innerHTML = "";

  questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
            <p>${question.question}</p>
            <ul>
                ${question.options
                  .map((option) => `<li>${option}</li>`)
                  .join("")}
            </ul>
            <button onclick="revealCorrectAnswers(${index})">Reveal Correct Answer</button>
        `;
    questionListContainer.appendChild(questionDiv);
  });
}

function filterQuestions() {
  const filterInput = document.getElementById("filterInput");
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(filterInput.value.toLowerCase())
  );
  renderFilteredQuestions(filteredQuestions);
}

function renderFilteredQuestions(filteredQuestions) {
  const questionListContainer = document.getElementById("question-list");
  questionListContainer.innerHTML = "";

  filteredQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `
            <p class="filter-text">${question.question}</p>
            <ul>
                ${question.options
                  .map((option) => `<li class="filter-text">${option}</li>`)
                  .join("")}
            </ul>
            <button class="reveal-button" onclick="revealCorrectAnswers(${index})">Reveal Correct Answer</button>
        `;
    questionListContainer.appendChild(questionDiv);
  });
}

function addQuestion() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const option3 = document.getElementById("option3").value;
  const option4 = document.getElementById("option4").value;
  const correctOption = parseInt(
    document.getElementById("correctOption").value
  );

  const newQuestion = {
    question,
    options: [option1, option2, option3, option4],
    correctOption,
  };

  questionsArray.push(newQuestion);
  updateQuestionList();
  document.getElementById("questionForm").reset();
}

function updateQuestionList() {
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";

  questionsArray.forEach((q, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Q${index + 1}: ${q.question}`;
    questionList.appendChild(listItem);
  });
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
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((data) => {
    // Extract only the title field for simplicity
    quizQuestions = data.map((item) => ({
      question: item.title,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "option1",
    }));
    displayQuestions();
  })
  .catch((error) =>
    console.error("Error fetching initial questions data:", error)
  );

// Randomly sort the questions
function randomSort() {
  quizQuestions.sort(() => Math.random() - 0.5);
  displayQuestions();
}

// Sort the questions alphabetically
function alphabeticalSort() {
  quizQuestions.sort((a, b) => a.question.localeCompare(b.question));
  displayQuestions();
}
