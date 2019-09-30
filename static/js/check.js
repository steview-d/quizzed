
/*
simple js script to make sure user doesn't try to access quiz directly through
quiz.html as for first tine users, this would bypass the setting of required
variables in localStorage for playerName and highScores.
----
only checks for playerName. If this exists, other required vars must also exist
as they are created and stored on page load.
----
positioned on it's own within page header to stop entire page loading before
a potential redirect.
*/

if (localStorage.getItem("playerName") === null) {
    window.location.assign("index.html");
}
