const question = document.getElementById('question');
const answer = document.getElementById('answer');
const submit = document.getElementById('submit');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 10;
let interval;

const verbs = [
  { infinitive: 'werken', present: ['werk', 'werkt', 'werken', 'werken', 'werkt', 'werken'] },
  { infinitive: 'lezen', present: ['lees', 'leest', 'lezen', 'lezen', 'leest', 'lezen'] },
  // Ajoutez d'autres verbes ici
];

function startTimer() {
  clearInterval(interval);
  timeLeft = 10;
  timerDisplay.textContent = `Temps restant: ${timeLeft}s`;
  interval = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.textContent = `Temps restant: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      checkAnswer();
    }
  }, 1000);
}

function generateQuestion() {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const pronounIndex = Math.floor(Math.random() * 6);
  const pronouns = ['ik', 'je', 'wij', 'jullie', 'u', 'zij'];
  question.textContent = `Conjuguez le verbe "${verb.infinitive}" avec le pronom "${pronouns[pronounIndex]}":`;
  answer.value = '';
  answer.focus();
  startTimer();
  return { verb, pronounIndex };
}

let currentQuestion = generateQuestion();

function checkAnswer() {
  const correctAnswer = currentQuestion.verb.present[currentQuestion.pronounIndex];
  if (answer.value.trim().toLowerCase() === correctAnswer) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedback.textContent = 'Bravo !';
  } else {
    feedback.textContent = `Erreur. La réponse correcte est "${correctAnswer}". Réessayez.`;
  }
  currentQuestion = generateQuestion();
}

submit.addEventListener('click', () => {
  checkAnswer();
});

answer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});
