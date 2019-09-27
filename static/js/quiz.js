// variables
var highScores = JSON.parse(localStorage.getItem("highScores"));
var playerName = localStorage.getItem("playerName");
var score = 0;
var multiplier = 1.0;

const playerNameBox = document.querySelector('#playerNameBox > h3');
const multiplierBox = document.querySelector('#multiplierBox > h3');
const scoreBox = document.querySelector('#scoreBox > h3');

// populate info boxes on page load
playerNameBox.innerHTML = playerName;
multiplierBox.innerHTML = multiplier;
scoreBox.innerHTML = score;