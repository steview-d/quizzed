// variables
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var score = 0;
var multiplier = 1.0;
var qCount = 0; // tbc if this is even needed?
var gameActive = true;

var qData;

// API url - this will need working on to eventually pull the data required
// for now, 3 random questions is fine for testing
const url = "https://opentdb.com/api.php?amount=3";

// stats constants
const playerNameBox = document.querySelector("#playerNameBox > h3");
const multiplierBox = document.querySelector("#multiplierBox > h3");
const scoreBox = document.querySelector("#scoreBox > h3");

// q&a constants
const qNum = document.querySelector("#q-num");
const qText = document.querySelector("#q-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");

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

// ------------------------------------------------------------- Main Game Loop

function gameLoop(qData) {
    qData.forEach(question => {
        console.log(question);
    });

    var x = 1;

    while (gameActive) {
        console.log(gameActive);
        x++;
        if (x === 5) {
            break;
        }
    }
}

// ------------------------------------------------------ End Of Main Game Loop

// logic start

updateStats();

getData(url, function(data) {
    qData = data.results;

    // Call main game loop once data is ready
    gameLoop(qData);
});
