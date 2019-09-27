// simple js script to make sure user doesn't try to access quiz directly through quiz.html
// as for first tine users, this would bypass the setting of required variables in
// localStorage for playerName and highScores.

if (localStorage.getItem("highScores") === null || localStorage.getItem("playerName") === null) {
    window.location.assign("index.html");
}
