// variables
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var score = 0;
var answerReward = 100;
var multiplier = 1.0;
var qNum = 0;
var correctAnswer;
var correctAnswerPos;
var allAnswers = [];
var playerAnswer;
var qData;

// Open Trivia DB API access variables
var qLimit = 3;
var difficulty = "easy";
const url = `https://opentdb.com/api.php?amount=${qLimit}&difficulty=${difficulty}&type=multiple`;

// stats constants
const playerNameBox = document.querySelector("#playerNameBox > h3");
const multiplierBox = document.querySelector("#multiplierBox > h3");
const scoreBox = document.querySelector("#scoreBox > h3");
const qaBox = document.querySelector("#qa-box");
const endGameSummary = document.querySelector("#end-game-summary");
const endGameScore = document.querySelector("#end-game-score");

// q&a constants
const qNumBox = document.querySelector("#q-num");
const qTextArea = document.querySelector("#q-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");

// IMPORTANT
// this needs to be text answers - not elements
const answerList = [answer1, answer2, answer3, answer4];
// const answerList = [answer1.innerText, answer2.innerText, answer3.innerText, answer4.innerText];


const answerBoxes = document.querySelectorAll(".answer-grid-inner");
const nextQuestion = document.querySelector("#next-question");
const nextQuestionButton = document.querySelector("#next-question-button");
const pause = 1000;
const highScoreMessage = document.querySelector("#high-score-message");

// variables for testing
const dataDisplay = document.querySelector("#data-display");

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

// Update stat boxes
function updateStats() {
    playerNameBox.innerHTML = playerName;
    multiplierBox.innerHTML = multiplier.toFixed(2);
    scoreBox.innerHTML = score;
}

// shuffle function, Fisher-Yates
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ask questions and listen for user answer
function askQuestion(qData) {

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
        // answerList[idx] = answer;
    });

    // find correct answer in array
    correctAnswerPos = answerList.indexOf(correctAnswer);


    // listen for user input when clicking an answer
    answerBoxes.forEach(answerBox => {
        answerBox.addEventListener("click", checkAnswer);
    });
}

// check if user answer is correct and either
// ask next question or end game if all questions
// have been answered
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
        multiplier *= 1.2;
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
        multiplier = 1;
    }

    updateStats();

    // check whether to end game or continue to next question
    // refactor this...
    if (qNum === qLimit - 1) {
        setTimeout(function() {
            e.path[0].classList.remove("bg-success");
            e.path[0].classList.remove("bg-danger");
            endGame();
        }, pause);
    } else {
        qNum++;
        allAnswers = [];
        setTimeout(function() {
            e.path[0].classList.remove("bg-success");
            e.path[0].classList.remove("bg-danger");
            askQuestion(qData);
        }, pause);
    }
};

// display end game summary and allow user to
// play again or view high scores
function endGame() {
    endGameSummary.classList.remove("hidden");
    qaBox.classList.add("hidden");
    endGameScore.innerHTML = score;
    checkForHighScore();
}

function checkForHighScore () {
    for(let i = 0; i < highScores.length; i++) {
        if (score >= highScores[i].score) {
            // console.log(i, highScores[i], score);
            let newScore = {player: `${playerName}`, score: score};
            highScores.splice(i, 0, newScore);
            highScores.pop();
            localStorage.setItem("highScores", JSON.stringify(highScores));
            highScoreMessage.innerText = "Well done, you made it on to the high score table!";
            break;
        }
    }
}

// logic start
updateStats();
// uncomment below to pull from API
// getData(url, function(data) {
//     qData = data.results;

//     // Call main game loop once data is ready
//     askQuestion(qData);
// });

// dummy data 6 questions
// var dummyData = {"response_code":0,"results":[{"category":"Art","type":"multiple","difficulty":"easy","question":"Who painted the Sistine Chapel?","correct_answer":"Michelangelo","incorrect_answers":["Leonardo da Vinci","Pablo Picasso","Raphael"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"Which of the following European languages is classified as a &quot;language isolate?&quot;","correct_answer":"Basque","incorrect_answers":["Galician","Maltese","Hungarian"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"In the fighting game &quot;Skullgirls,&quot; which character utilizes a folding chair called the &quot;Hurting&quot; as a weapon?","correct_answer":"Beowulf","incorrect_answers":["Big Band","Squigly","Cerebella"]},{"category":"History","type":"multiple","difficulty":"easy","question":"The collapse of the Soviet Union took place in which year?","correct_answer":"1991","incorrect_answers":["1992","1891","1990"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"In Undertale, what&#039;s the prize for answering correctly?","correct_answer":"More questions","incorrect_answers":["New car","Mercy","Money"]},{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"In &quot;Hexadecimal&quot;, what color would be displayed from the color code? &quot;#00FF00&quot;?","correct_answer":"Green","incorrect_answers":["Red","Blue","Yellow"]}]};
// dummy data 3 questions
var dummyData = {"response_code":0,"results":[{"category":"History","type":"multiple","difficulty":"easy","question":"Which one of these tanks was designed and operated by the United Kingdom?","correct_answer":"Tog II","incorrect_answers":["M4 Sherman","Tiger H1","T-34"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"Which eSports team came first place in The International Dota 2 Championship 2016?","correct_answer":"Wings Gaming","incorrect_answers":["Digital Chaos","Evil Geniuses","Fnatic"]},{"category":"Entertainment: Television","type":"multiple","difficulty":"easy","question":"In the show, Doctor Who, what does T.A.R.D.I.S stand for?","correct_answer":"Time And Relative Dimensions In Space","incorrect_answers":["Time And Resting Dimensions In Space","Time And Relative Dimensions In Style","Toilet Aid Rope Dog Is Soup"]}]};

qData = dummyData.results;

// start game
askQuestion(qData);
