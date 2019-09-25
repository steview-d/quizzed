// variables

var highScores = [];

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


highScores.map((item, idx) => {
    document.querySelector(`#hs-n${idx + 1}`).innerHTML =
        item.player[0].toUpperCase() + item.player.slice(1);
    document.querySelector(`#hs-s${idx + 1}`).innerHTML = item.score;
});
