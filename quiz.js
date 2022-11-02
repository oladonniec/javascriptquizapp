const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const quizContainerElement = document.getElementById("quizContainer");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answerButtons");

let shuffledQuestion, currentQuestionIndex;

const questions = [
  {
    question: "What is 2 + 2",
    answers: [
      { text: 4, correct: true },
      { text: 22, correct: false },
    ],
  },
  {
    question: "What is 5 + 5",
    answers: [
      { text: 55, correct: false },
      { text: 10, correct: true },
    ],
  },
  {
    question: "What is 10 + 0",
    answers: [
      { text: 100, correct: false },
      { text: 10, correct: true },
    ],
  },
];

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestion = questions.sort(() => Math.random() * 0.5);
  currentQuestionIndex = 0;
  quizContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
