const questionText = document.querySelector('#question-text');
const buttons = document.querySelector('#question-buttons');
const next = document.querySelector('.next');

const modal = document.querySelector('#staticBackdrop');
const openModalButton = document.querySelector('#open-modal');
const closeModalButton = document.querySelector('#close-modal');

const signin = document.querySelector('.signin');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

let score = 0;
let questionIndex = 0;
let idCount = 1;

// opening login modal on page load

window.addEventListener("load", (event) => {
    openModalButton.click();
});

// form validation

signin.addEventListener('click', function (e) {
    // stop page refresh on button click
    e.preventDefault();
    if (username.value == 'admin' && password.value == 'password') {
        // give access to quiz if proper credentials are input
        closeModalButton.click();
    } else {
        // else modal stays open
        return;
    }
});

// making adding questions easy, just add it to the array

const questions = [
    {
        question: "What year was Baldur's Gate 3 officially released?",
        answers: [
            { text: "2021", correct: false },
            { text: "2019", correct: false },
            { text: "2024", correct: false },
            { text: "2023", correct: true },
            { text: "2020", correct: false },
        ],
        index: 0
    },
    {
        question: "How many companions (max) can the player recruit?",
        answers: [
            { text: "3", correct: false },
            { text: "10", correct: true },
            { text: "7", correct: false },
            { text: "6", correct: false },
            { text: "5", correct: false },
        ]
    },
    {
        question: "Who developed Baldur's Gate 3?",
        answers: [
            { text: "EA", correct: false },
            { text: "Quantum Dream", correct: false },
            { text: "Ubisoft", correct: false },
            { text: "Nintendo", correct: false },
            { text: "Larian", correct: true },
        ]
    },
    {
        question: "What is the max level?",
        answers: [
            { text: "12", correct: true },
            { text: "14", correct: false },
            { text: "20", correct: false },
            { text: "10", correct: false },
            { text: "15", correct: false },
        ]
    },
    {
        question: "What edition of D&D is used in baldur's Gate 3?",
        answers: [
            { text: "4e", correct: false },
            { text: "6e", correct: false },
            { text: "2e", correct: false },
            { text: "5e", correct: true },
            { text: "7e", correct: false },
        ]
    }
];

// reset quiz function
function quiz() {
    idCount = 1;
    questionIndex = 0;
    score = 0;
    next.innerHTML = 'Next';
    quizQuestions();
}

// display quiz questions function
function quizQuestions() {
    changeQuestions();
    let currentQuestion = questions[questionIndex];
    let questionNum = questionIndex + 1;
    questionText.innerHTML = questionNum + ". " + currentQuestion.question;

    // adding the bootstrap here after each question
    currentQuestion.answers.forEach(answer => {
        // create question elements 
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');

        // add element classes
        // div
        div.classList.add('form-check');

        // input
        input.classList.add('btn-check');
        input.type = 'radio';
        input.name = 'options';
        input.id = 'flexRadioDefault' + idCount;
        input.autocomplete = 'off';

        // label
        label.classList.add('btn');
        label.setAttribute('for', 'flexRadioDefault' + idCount);
        label.innerHTML = answer.text;
        idCount++;

        // append to question area
        div.appendChild(input);
        div.appendChild(label);
        buttons.appendChild(div);

        if (answer.correct) {
            label.dataset.correct = answer.correct;
        }

        label.addEventListener('click', selectAnswer);
    });
}

// display next quiz question function
function changeQuestions() {
    next.style.display = 'none';
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

// validating submitted answers
function selectAnswer(e) {
    let answer = e.target;
    let correctAnswer = answer.dataset.correct == 'true';
    if (correctAnswer) {
        answer.classList.add('correct');
        score++;
    } else {
        answer.classList.add('incorrect');
    }
    // use array.from or foreach will not work due to type error
    // will also not work without .children
    Array.from(buttons.children).forEach(button => {
        if (button.lastChild.dataset.correct === 'true') {
            console.log(button);
            button.lastChild.classList.add('correct');
        }
        button.firstChild.disabled = true;
    });
    next.style.display = 'block';
}

// calculating score
function calculateScore() {
    changeQuestions();
    questionText.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = 'Play again!';
    next.style.display = 'block';
}

function clickNext() {
    questionIndex++;
    console.log(questionIndex);
    if (questionIndex < questions.length) {
        quizQuestions();
        console.log(score);
    }
    else {
        calculateScore();
    }
}

next.addEventListener('click', function () {
    if (questionIndex < questions.length) {
        clickNext();
    } else {
        quiz();
    }
});

quiz();

