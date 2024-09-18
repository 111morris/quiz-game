import { questions } from "./questions.js";


const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answerButtons');
const nextButton = document.querySelector('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = 'Next';
   showQuestion();
};

function showQuestion() {
   resetState();
   const currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

   currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.innerHTML = String.fromCharCode(65 + index) + '. ' + answer.text;
      button.classList.add('btn');
      answerButtons.appendChild(button);

      if (answer.correct) {
         /*    <== if there will be an error of not declared use: -
             
            answer.correct = answer.correct or 
            button.dataset.correct = 'true' instead==> */
         button.dataset.correct = answer.correct;
      };
      button.addEventListener('click', selectAnswer);
   });
};
function resetState() {
   nextButton.style.display = 'none';
   while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
   };
};

function selectAnswer(e) {
   const selectedBtn = e.target;
   // console.log(selectedBtn.dataset.correct)
   const inCorrect = selectedBtn.dataset.correct === 'true';

   if (inCorrect) {
      selectedBtn.classList.add('correct');
      score++;
   } else {
      selectedBtn.classList.add('incorrect');
   };
   Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === 'true') {
         button.classList.add('correct');
      }
      button.disabled = true;
   });
   nextButton.style.display = 'block';
};

function showScore() {
   resetState();
   questionElement.innerHTML = `You scored (${score} out of ${questions.length}). \n Percentage score is = ${(score / questions.length).toFixed(1) * 100}%`;
   nextButton.innerHTML = 'Play Again';
   setTimeout(() => nextButton.style.display = 'block', 2000);
}
function handleNextButton() {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
      showQuestion();
   } else {
      showScore();
   }
}

nextButton.addEventListener('click', () => {
   if (currentQuestionIndex < questions.length) {
      handleNextButton();
   } else {
      startQuiz();
   }
})
startQuiz();
