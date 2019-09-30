// --------------------------------------------- variables

// vars
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var difficulty = localStorage.getItem("difficulty");
var qLimit = 3;
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
    qTextArea.innerText = qData[qNum].question;

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
        answerList[idx].innerText = answer;
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
            if (answerBox.innerText === correctAnswer) {
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


// --------------------------------------------- Main

setMultiplier(difficulty);
updateStats();

// getData(url, function(data) {
//     qData = data.results;

//     // Call main game loop once data is ready
//     askQuestion(qData);
// });

// dummy data 6 questions
// var dummyData = {"response_code":0,"results":[{"category":"Art","type":"multiple","difficulty":"easy","question":"Who painted the Sistine Chapel?","correct_answer":"Michelangelo","incorrect_answers":["Leonardo da Vinci","Pablo Picasso","Raphael"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"Which of the following European languages is classified as a &quot;language isolate?&quot;","correct_answer":"Basque","incorrect_answers":["Galician","Maltese","Hungarian"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"In the fighting game &quot;Skullgirls,&quot; which character utilizes a folding chair called the &quot;Hurting&quot; as a weapon?","correct_answer":"Beowulf","incorrect_answers":["Big Band","Squigly","Cerebella"]},{"category":"History","type":"multiple","difficulty":"easy","question":"The collapse of the Soviet Union took place in which year?","correct_answer":"1991","incorrect_answers":["1992","1891","1990"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"In Undertale, what&#039;s the prize for answering correctly?","correct_answer":"More questions","incorrect_answers":["New car","Mercy","Money"]},{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"In &quot;Hexadecimal&quot;, what color would be displayed from the color code? &quot;#00FF00&quot;?","correct_answer":"Green","incorrect_answers":["Red","Blue","Yellow"]}]};
// dummy data 3 questions
var dummyData = {
    response_code: 0,
    results: [
        {
            category: "History",
            type: "multiple",
            difficulty: "easy",
            question:
                "Which one of these tanks was designed and operated by the United Kingdom?",
            correct_answer: "Tog II",
            incorrect_answers: ["M4 Sherman", "Tiger H1", "T-34"]
        },
        {
            category: "Entertainment: Video Games",
            type: "multiple",
            difficulty: "easy",
            question:
                "Which eSports team came first place in The International Dota 2 Championship 2016?",
            correct_answer: "Wings Gaming",
            incorrect_answers: ["Digital Chaos", "Evil Geniuses", "Fnatic"]
        },
        {
            category: "Entertainment: Television",
            type: "multiple",
            difficulty: "easy",
            question:
                "In the show, Doctor Who, what does T.A.R.D.I.S stand for?",
            correct_answer: "Time And Relative Dimensions In Space",
            incorrect_answers: [
                "Time And Resting Dimensions In Space",
                "Time And Relative Dimensions In Style",
                "Toilet Aid Rope Dog Is Soup"
            ]
        }
    ]
};
qData = dummyData.results;

askQuestion(qData);
