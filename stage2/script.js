const questions = [];

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

  questions.push(question);
  renderQuestionList();
}

function revealCorrectAnswers(index) {
  const correctOption = questions[index].correctOption;

  document.querySelectorAll(`[name="options"]`).forEach((option, i) => {
    if (option.value === correctOption) {
      option.classList.add("correct-answer");
    } else {
      option.classList.add("incorrect-answer");
    }
  });
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
