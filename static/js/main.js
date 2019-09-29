// variables
var highScores = [];
var playerName;
var difficulty;

const nameInput = document.querySelector("#playerName");
const playerNameDiv = document.querySelector("#player-name-container");
const startQuiz = document.querySelector('#quiz-start');
const difficultyDropdown = document.querySelector('#difficulty-selector');
const difficultyOptions = document.querySelectorAll('.difficulty-option');

// prepare high score information
if (localStorage.getItem("highScores") === null) {
    highScores = [
        { player: "arthur", score: 600 },
        { player: "ben", score: 500 },
        { player: "carl", score: 400 },
        { player: "dean", score: 300 },
        { player: "edward", score: 200 }
    ];
    localStorage.setItem("highScores", JSON.stringify(highScores));
} else {
    highScores = JSON.parse(localStorage.getItem("highScores"));
}

// populate high score table with high score data
if (document.getElementById("high-score-table")) {
    highScores.map((item, idx) => {
        document.querySelector(`#hs-n${idx + 1}`).innerHTML =
            item.player[0].toUpperCase() + item.player.slice(1);
        document.querySelector(`#hs-s${idx + 1}`).innerHTML = item.score;
    });
}

// check if player name in local storage
if (localStorage.getItem("playerName") === null) {
    nameInput.value = "";
} else {
    nameInput.value = localStorage.getItem("playerName");
    startQuiz.classList.remove("disabled");
}

// get player name from input form
nameInput.addEventListener("keyup", () => {
    if (nameInput.value === "") {
        localStorage.removeItem("playerName");
        startQuiz.classList.add("disabled");
    } else {
        localStorage.setItem("playerName", nameInput.value);
        startQuiz.classList.remove("disabled");
    }
});

// get difficulty level value
if (localStorage.getItem("difficulty") === null) {
    difficulty = 'easy';
} else {
    difficulty = localStorage.getItem("difficulty");
}

// set difficulty value in navbar dropdown
difficultyOptions.forEach(option => {
    console.log(option);
    if (option.value === difficulty) {
        option.setAttribute("selected", "");
    } else {
        option.removeAttribute("selected");
    }
});

// Update difficulty value if user changes it
difficultyDropdown.addEventListener('change', (e) => {
    localStorage.setItem("difficulty", e.path[0].value);
});


