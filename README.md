# Quizzed!

A simple js quiz game that pulls questions & answers from the [Open Trivia Database](https://opentdb.com/).

The purpose of this project was to gain more experience with js and API's. I also took the opportunity to use SCSS for the styling, having only previously used it for learning, and not in an actual project of my own.

 
## UX

The UX has been kept intentionally simple. It's not a big project by any means, and the overall UX reflects this.

The objective was to allow a user to answer a series of 10 questions, and record their score in a high score table, assuming the score is high enough. There is an optional difficulty level that can be set by the user, which defaults to 'easy'.

Wireframes are can be viewed [here](static/img/wireframes).

## Features

- Multiple choice questions - Q&A's are pulled from the Open Trivia DB. The question is presented alongside 4 possible answers. If the user chooses correctly, the answer is highlighted in green to show this. If the user answers incorrectly, their answer is highlighted red, and the correct answer is highlighted green.

- High score table - On first page load, a high score table is placed in localStorage and at the end of each game the users score is checked against this table. If they score high enough, their name and score are recorded.

- Difficulty selector - The API groups its questions as 'easy', 'medium' and 'hard' and the user can choose to answer the questions of any difficulty. The higher the difficulty, the more points can be scored.

- Instructions - Not a complicated game by any means, but a link in the upper right of the navbar allows users to read instructions, should they choose.

## Technologies Used

I wanted to keep things as minimalist as possible, to allow me to focus on using just plain js, without the use of additional libraries. Bootstrap 4 has been used for the styling, but otherwise everything is just plain old HTML, SCSS and JavaScript.

## Testing

My goal was really only to get it up and running (and working!) which it does. It displays fine across a range of devices and screen sizes. There are no console errors, localStorage works as it should, the scores calculate correctly and the difficulty selector pulls the right questions. It has been tested by numerous people and no errors reported.

## Deployment

Only being a static site, it's hosted on GitHub pages, and can be found at [https://steview-d.github.io/quizzed/](https://steview-d.github.io/quizzed/)

## Credits

Everything is my own work, except for the following....

### Questions & Answers
- All questions and answers sourced from [Open Trivia Database](https://opentdb.com/) - along with their logo too.

### Media
- The background image is by [Gerd Altmann](https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=582603) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=582603)