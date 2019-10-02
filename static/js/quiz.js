// --------------------------------------------- variables

// vars
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var difficulty = localStorage.getItem("difficulty");
var qLimit = 10;
var qNum = 0;
var qData;
var score = 0;
var answerReward = 100;
var multiplier;
var multiplierBase;
var multiplierFactor;
var correctAnswer;
var allAnswers = [];
var playerAnswer;

// url for pulling Q&A data from API
const url = `https://opentdb.com/api.php?amount=${qLimit}&difficulty=${difficulty}&type=multiple`;

// stat boxes
const playerNameBox = document.querySelector("#playerNameBox > h2");
const multiplierBox = document.querySelector("#multiplierBox > h2");
const scoreBox = document.querySelector("#scoreBox > h2");

// question & answer box
const qaBox = document.querySelector("#qa-box");
const qNumBox = document.querySelector("#q-num");
const qTextArea = document.querySelector("#q-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");
const answerList = [answer1, answer2, answer3, answer4];
const answerBoxes = document.querySelectorAll(".answer-grid-inner");
const pause = 1000;

// end game box
const highScoreMessage = document.querySelector("#high-score-message");
const endGameSummary = document.querySelector("#end-game-summary");
const endGameScore = document.querySelector("#end-game-score");


// --------------------------------------------- functions

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

// set multiplier values based on selected difficulty
function setMultiplier(difficulty) {
    switch (difficulty) {
        case "hard":
            multiplierBase = 1.5;
            multiplierFactor = 1.4;
            break;
        case "medium":
            multiplierBase = 1.2;
            multiplierFactor = 1.3;
            break;
        default:
            multiplierBase = 1;
            multiplierFactor = 1.2;
    }
    multiplier = multiplierBase;
}

// Update name, multiplier, and score
function updateStats() {
    playerNameBox.innerText = playerName;
    multiplierBox.innerText = multiplier.toFixed(2);
    scoreBox.innerText = score;
}

// shuffle function, Fisher-Yates. Used tp shuffle answers within array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// end game summary - user chooses to play again or view high scores
function endGame() {
    endGameSummary.classList.remove("hidden");
    qaBox.classList.add("hidden");
    endGameScore.innerText = score;
    checkForHighScore();
}

// update high score array and store in localStorage
function checkForHighScore() {
    for (let i = 0; i < highScores.length; i++) {
        if (score >= highScores[i].score) {
            // console.log(i, highScores[i], score);
            let newScore = { player: `${playerName}`, score: score };
            highScores.splice(i, 0, newScore);
            highScores.pop();
            localStorage.setItem("highScores", JSON.stringify(highScores));
            highScoreMessage.innerText =
                "Well done, you made it on to the high score table!";
            break;
        }
    }
}

// ask questions and listen for user answer
function askQuestion(qData) {
    // ask the question
    qNumBox.innerText = `Q${qNum + 1}`;
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

// provide feedback on answer - move to next question, or end game
var checkAnswer = function(e) {
    // remove event listeners
    answerBoxes.forEach(answerBox => {
        answerBox.removeEventListener("click", checkAnswer);
    });

    // check answer
    playerAnswer = e.path[0].innerText;
    if (playerAnswer == correctAnswer) {
        e.path[0].classList.add("bg-success");
        score += Math.round(answerReward * multiplier);
        multiplier *= multiplierFactor;
    } else {
        e.path[0].classList.add("bg-danger");
        // on wrong answer, highlight correct answer
        answerBoxes.forEach(answerBox => {
            if (answerBox.innerHTML === decodeHTML(correctAnswer)) {
                answerBox.classList.add("bg-success");
                setTimeout(function() {
                    answerBox.classList.remove("bg-success");
                }, pause);
            }
        });
        // reset multiplier on incorrect answer
        multiplier = multiplierBase;
    }

    updateStats();

    setTimeout(function() {
        e.path[0].classList.remove("bg-success");
        e.path[0].classList.remove("bg-danger");
        // next question, or end game...
        if (qNum === qLimit - 1) {
            endGame();
        } else {
            qNum++;
            allAnswers = [];
            askQuestion(qData);
        }
    }, pause);
};

// remove HTML char encoding from passed string
function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


// --------------------------------------------- Main

setMultiplier(difficulty);
updateStats();

getData(url, function(data) {
    qData = data.results;

    // Call main game loop once data is ready
    askQuestion(qData);
});
