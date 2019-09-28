// variables
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var score = 0;
var multiplier = 1.0;
var qNum = 0; // tbc if this is even needed?
var qLimit = 3;
var gameActive = true;
var correctAnswer;
var wrongAnswers;
var allAnswers = [];
var playerAnswer;

var qData;

// API url - this will need working on to eventually pull the data required
// for now, 3 random questions is fine for testing
const url =
    "https://opentdb.com/api.php?amount=3&difficulty=easy&type=multiple";

// stats constants
const playerNameBox = document.querySelector("#playerNameBox > h3");
const multiplierBox = document.querySelector("#multiplierBox > h3");
const scoreBox = document.querySelector("#scoreBox > h3");

// q&a constants
const qNumBox = document.querySelector("#q-num");
const qTextArea = document.querySelector("#q-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");
const answerList = [answer1, answer2, answer3, answer4];

const answerBoxes = document.querySelectorAll(".answer-grid-inner");

// variables for testing
const dataDisplay = document.querySelector("#data-display");

// Update stat boxes
function updateStats() {
    playerNameBox.innerHTML = playerName;
    multiplierBox.innerHTML = multiplier;
    scoreBox.innerHTML = score;
}

// pull data from the API
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

// shuffle function - Fisher - Yates
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ------------------------------------------------------------- Main Game Loop

function gameLoop(qData) {
    // qData.forEach(question => {
    //     console.log(question);
    // });

    // ask the question
    qNumBox.innerHTML = `Q${qNum + 1}`;
    qTextArea.innerHTML = qData[qNum].question;

    // store the correct answer
    correctAnswer = qData[qNum].correct_answer;

    // add all answers - right & wrong - to allAnswers array, and shuffle it
    allAnswers.push(correctAnswer);
    qData[qNum].incorrect_answers.forEach(answer => {
        allAnswers.push(answer);
    });
    allAnswers = shuffle(allAnswers);

    // display answers
    allAnswers.forEach((answer, idx) => {
        answerList[idx].innerHTML = answer;
    });

    // listen for user input when clicking an answer
    answerBoxes.forEach(answerBox => {
        answerBox.addEventListener("click", checkAnswer);
    });
}

var checkAnswer = function(e) {
    console.log(qNum);

    // remove event listeners
    answerBoxes.forEach(answerBox => {
        answerBox.removeEventListener("click", checkAnswer);
    });

    // check answer
    playerAnswer = e.path[0].innerText;
    if (playerAnswer == correctAnswer) {
        score += 10;
    }

    updateStats();

    // check whether to end game or continue to next question
    if (qNum === qData.length - 1) {
        endGame();
    } else {
        qNum += 1;
        allAnswers = [];

        gameLoop(qData);
    }
};

function endGame () {
    console.log("THE END!!!!");
    // next steps?
    // hide Q&A section - keep stat boxes
    // message saying end of game
    // big score display
    // options....
    // advise if player made it onto high score table
    // 2 options - play again (refresh page)
    // or view high scores (load index)

    // ALSO
    // after each question attempt, show if right or wrong
    // and have a 'next question' button
    // either under answers, or floats at bottom of window
}

// ------------------------------------------------------ End Of Main Game Loop

// logic start

updateStats();

getData(url, function(data) {
    qData = data.results;

    // Call main game loop once data is ready
    gameLoop(qData);
});
