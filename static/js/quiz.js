// variables
var highScores = [];
var playerName;

const nameInput = document.querySelector("#playerName");
const playerNameDiv = document.querySelector("#player-name-container");

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

// remove the player name from localStorage
function removeName() {
    localStorage.removeItem("playerName");
    nameInput.value = "";
    console.log("HELLO");
    playerNameDiv.classList.remove("hidden");
}

nameInput.value = localStorage.getItem("playerName");

// check if player name in local storage
if (localStorage.getItem("playerName") === null) {
    playerNameDiv.classList.remove("hidden");
} else {
    playerNameDiv.classList.add("hidden");
}

// get player name from input form
nameInput.addEventListener("keyup", () => {
    if (nameInput.value === "") {
        localStorage.removeItem("playerName");
    } else {
        localStorage.setItem("playerName", nameInput.value);
    }
});
