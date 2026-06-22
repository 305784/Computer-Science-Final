// Quiz data with questions, answer options, and correct answer indexes
const quizQuestions = [
  {
    question: "Which country won the 2022 FIFA World Cup?",
    options: ["France", "Argentina", "Brazil", "Germany"],
    answer: 1,
  },
  {
    question: "How many teams will compete in the 2026 World Cup?",
    options: ["32", "40", "48", "56"],
    answer: 2,
  },
  {
    question: "Which three countries are co-hosting the 2026 World Cup?",
    options: ["USA, Canada, Mexico", "USA, Brazil, Mexico", "Canada, England, USA", "Mexico, Canada, Spain"],
    answer: 0,
  },
  {
    question: "What is the nickname of the World Cup trophy?",
    options: ["The Cup of Dreams", "The Golden Prize", "The World Cup Trophy", "The Jules Rimet Trophy"],
    answer: 3,
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Argentina", "Brazil", "Italy", "Germany"],
    answer: 1,
  },
  {
    question: "Who scored the winning goal in the 2010 FIFA World Cup final?",
    options: ["Andrés Iniesta", "Lionel Messi", "Cristiano Ronaldo", "Thomas Müller"],
    answer: 0,
  },
  {
    question: "Which city hosted the 2014 FIFA World Cup final?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    answer: 0,
  },
  {
    question: "Which player holds the record for most World Cup goals in a single tournament?",
    options: ["Ronaldo", "Miroslav Klose", "Just Fontaine", "Pelé"],
    answer: 2,
  },
  {
    question: "How many times has Germany won the FIFA World Cup (as of 2026)?",
    options: ["3", "4", "5", "6"],
    answer: 1,
  },
  {
    question: "Which country hosted the first ever FIFA World Cup in 1930?",
    options: ["Uruguay", "Italy", "Brazil", "Argentina"],
    answer: 0,
  },
];

// Get references to HTML elements used in the quiz
const quizStatus = document.getElementById("quiz-status");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizScore = document.getElementById("quiz-score");
const quizNext = document.getElementById("quiz-next");
const quizReset = document.getElementById("quiz-reset");

// Track the current question, score, and answer state
let currentIndex = 0;
let score = 0;
let answered = false;

// Initialize quiz state and show the first question
function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  quizStatus.textContent = "Quiz started! Pick an answer.";
  quizNext.disabled = true;
  renderQuestion();
  updateScore();
}

// Show the current question and create option buttons
function renderQuestion() {
  const question = quizQuestions[currentIndex];
  quizQuestion.textContent = question.question;
  quizOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.disabled = answered;
    button.addEventListener("click", () => handleAnswer(index));
    quizOptions.appendChild(button);
  });
}

// Process an answer click and show correct/wrong feedback
function handleAnswer(index) {
  if (answered) return;
  answered = true;
  const question = quizQuestions[currentIndex];
  const buttons = Array.from(document.querySelectorAll(".quiz-option"));
  buttons.forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === question.answer) {
      button.classList.add("correct");
    }
    if (optionIndex === index && optionIndex !== question.answer) {
      button.classList.add("wrong");
    }
  });

  if (index === question.answer) {
    score += 1;
    quizStatus.textContent = "Correct! Great job.";
  } else {
    quizStatus.textContent = `Wrong! The correct answer was "${question.options[question.answer]}".`;
  }

  updateScore();
  quizNext.disabled = false;
}

// Advance to the next question or finish the quiz
function nextQuestion() {
  if (!answered) return;
  currentIndex += 1;
  if (currentIndex >= quizQuestions.length) {
    quizStatus.textContent = `Quiz complete! You scored ${score} out of ${quizQuestions.length}.`;
    quizQuestion.textContent = "Good work!  Restart to play again.";
    quizOptions.innerHTML = "";
    quizNext.disabled = true;
    answered = false;
    return;
  }
  answered = false;
  quizStatus.textContent = "Pick the next answer.";
  quizNext.disabled = true;
  renderQuestion();
}

// Update the score display text
function updateScore() {
  quizScore.textContent = `Score: ${score} / ${quizQuestions.length}`;
}

// Attach button events for quiz controls
quizNext.addEventListener("click", nextQuestion);
quizReset.addEventListener("click", startQuiz);

// Show the selected tab panel and highlight the active tab
function setActiveTab(tabId) {
  const panels = document.querySelectorAll('.tab-panel');
  const buttons = document.querySelectorAll('.tabs__button');

  panels.forEach(panel => panel.classList.toggle('active', panel.id === tabId));
  buttons.forEach(button => button.classList.toggle('active', button.dataset.tab === tabId));
}

const tabButtons = document.querySelectorAll('.tabs__button');
tabButtons.forEach(button => {
  button.addEventListener('click', () => setActiveTab(button.dataset.tab));
});

// Set initial tab and start the quiz when the page loads
setActiveTab('overview');
startQuiz();
