// GLOBAL DATA -----------------------------
// Static array of objects containing quiz questions
var quizQuestion = [{
        questionString: "1. What is HTML an acronym for?",
        choices: ["Hyper Text Markup Language", "Highly Tuned Machine Learning", "Hollywood Themed Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        questionString: "2. What is CSS an acronym for?",
        choices: ["Coding Style System", "Canadian Social Standards", "Cascading Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        questionString: "3. What is another name for Javascript?",
        choices: ["HTTPscript", "ECMAscript", "WEBscript"],
        correctAnswer: "ECMAscript"
    },

    {
        questionString: "4. What type of braces does Javascripts use to declare a list?",
        choices: ["Square braces", "Curly braces", "Round braces"],
        correctAnswer: "Square braces"
    },
    {
        questionString: "5. What type of braces does Javascripts use to declare an object?",
        choices: ["Square braces", "Curly braces", "Round braces"],
        correctAnswer: "Curly braces"
    }
]
var currentQuestion = 0; // keep track of what question we're on
var currentScore = 0; // keep track of score; increments on choice-button click only.
// GLOBAL DATA -----------------------------
// RENDERING -----------------------------
function renderInitialPlaceholders() {
    // 1. Create heading element
    var h3Tag = document.createElement("H3");
    h3Tag.setAttribute("id", "quiz-question");
    document.getElementById("dynamic-content").appendChild(h3Tag);
    // 2. Create ordered list of choices 
    var olTag = document.createElement("OL");
    olTag.setAttribute("id", "quiz-choices");
    document.getElementById("dynamic-content").appendChild(olTag);
    // 3. Create three LIs with one button each as a child
    for (var i = 0; i < quizQuestion[0].choices.length; i++) {
        // create LI element to hold button
        var liTag = document.createElement("LI");
        liTag.setAttribute("id", ("choice-" + i));
        document.getElementById("quiz-choices").appendChild(liTag);
        // create button with choice string
        var choiceButton = document.createElement("BUTTON");
        choiceButton.setAttribute("id", ("choice-button-" + i));
        document.getElementById("choice-" + i).appendChild(choiceButton);
    }
    // add a handler for button clicks
    olTag.addEventListener("click", handleChoiceButtons);
}

function renderAllDoneScreen(doneString) {
    // Stop the timer
    clearInterval(questionTimer);
    // clear #timer-text
    document.getElementById("timer-text").innerText = "00:00";
    // 1. Update <h3>, Delete <ol>
    document.getElementById("quiz-question").innerText = doneString + " You scored: " + currentScore + "/" + quizQuestion.length;
    var olTag = document.getElementById("quiz-choices");
    document.getElementById("dynamic-content").removeChild(olTag);
    // 2. Render input-form as prompt to enter initials
    // create <form>
    var formTag = document.createElement("FORM");
    formTag.setAttribute("id", "all-done-form");
    document.getElementById("dynamic-content").appendChild(formTag);
    // create <label> with attributes
    var labelTag = document.createElement("LABEL");
    labelTag.setAttribute("for", "initials");
    labelTag.innerText = "Enter Your Initials:";
    formTag.appendChild(labelTag);
    // insert <br>
    formTag.appendChild(document.createElement("BR"));
    // create text field for initials
    var inputLabel = document.createElement("INPUT");
    inputLabel.setAttribute("type", "text");
    inputLabel.setAttribute("id", "initials");
    inputLabel.setAttribute("name", "initials");
    inputLabel.setAttribute("value", "AA");
    formTag.appendChild(inputLabel);
    // create Submit button
    var inputSubmit = document.createElement("INPUT");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Submit");
    inputSubmit.setAttribute("id", "submit-initials");
    formTag.appendChild(inputSubmit);
    // create 'Go Back' button
    var goBackButton = document.createElement("INPUT");
    goBackButton.setAttribute("type", "button");
    goBackButton.setAttribute("value", "Go Back");
    goBackButton.setAttribute("id", "go-back");
    formTag.appendChild(goBackButton);
    // create 'Go Back' button
    var viewHSButton = document.createElement("INPUT");
    viewHSButton.setAttribute("type", "button");
    viewHSButton.setAttribute("value", "View Highscores");
    viewHSButton.setAttribute("id", "view-hs");
    formTag.appendChild(viewHSButton);
    // register event listener for submit button
    document.getElementById("submit-initials").addEventListener("click", handleSubmitInitialsButton);
    // register event listener for go-back button
    document.getElementById("go-back").addEventListener("click", handleGoBackButton);
    // configure view highscores button
    var viewHsButton = document.getElementById("view-hs");
    viewHsButton.onclick = function() {
        document.getElementById("high-scores-modal").style.display = "block";
    }
}

function renderQuestion(questionObject) {
    // update question string in <H> element
    document.getElementById("quiz-question").innerText = questionObject.questionString;
    // update button text
    for (var i = 0; i < questionObject.choices.length; i++) {
        document.getElementById("choice-button-" + i).innerHTML = questionObject.choices[i];
    }
}
// RENDERING -----------------------------
// TIMER -----------------------------
const timerPerQuestion = 61;
var questionTimer = null;
var secondsLeft = {
    value: timerPerQuestion,
    getValue: function() { return this.value; },
    resetValue: function() { this.value = timerPerQuestion; },
    decrementValue: function(numSeconds) { this.value -= numSeconds; }
};

function timerHandler() {
    secondsLeft.decrementValue(1); // seconds timer
    if (secondsLeft.getValue() <= 0) {
        // move to next question till we have more
        // if (currentQuestion < quizQuestion.length - 1) {
        //     renderQuestion(quizQuestion[++currentQuestion]);
        // } else {
        // Handle timer-expiry on last question
        renderAllDoneScreen("You ran out of time!");
        // }
    } else {
        // update #timer-text
        var seconds = secondsLeft.getValue();
        document.getElementById("timer-text").innerText = "00:" + (seconds > 9 ? seconds : ("0" + seconds));
    }
}

function startQuestionTimer() {
    // re-initialize for next time
    secondsLeft.resetValue();
    // reset #timer-text
    document.getElementById("timer-text").innerText = "00:00";
    questionTimer = setInterval(timerHandler, 1000);
}
// TIMER -----------------------------
// BUTTONS -----------------------------
function createButton(buttonString) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = buttonString;
    document.getElementById("dynamic-content").appendChild(btn);
    return btn;
}

function deleteButton(buttonObject) {
    document.getElementById("dynamic-content").removeChild(buttonObject);
}
// BUTTONS -----------------------------
// HANDLERS -----------------------------
function handleViewHsButton(event) {
    var modalBox = document.getElementById("highScoresModal");
    modalBox.style.display = "block";
}

function handleGoBackButton(event) {
    // clear the screen by remove <h3> and <form>
    var h3Tag = document.getElementById("quiz-question");
    document.getElementById("dynamic-content").removeChild(h3Tag);
    var formTag = document.getElementById("all-done-form");
    document.getElementById("dynamic-content").removeChild(formTag);
    // re-init application
    initApplication();
}
// Helper function
function UpdateHighScores() {
    if (localStorage.getItem("high-scores") !== null) {
        // Retrieve existing JSON object for high scores
        var highScores = JSON.parse(localStorage.getItem("high-scores"));
        // Sort the array in descending order
        var highScoresSorted = highScores.userArray.sort(function(user1, user2) { return (user2.score - user1.score) });
        var numScores = highScoresSorted.length;
        // Loop through sorted scores and populate <li> in modal
        for (var i = 0; i < (numScores >= 3 ? 3 : numScores); i++) {
            var nextTopScorer = highScoresSorted[i];
            document.getElementById("top-score-" + i).innerText = nextTopScorer.initials + ": " + nextTopScorer.score + "/" + quizQuestion.length;
        }
    }
}
// Helper function
function handleSubmitInitialsButton(event) {
    // 1. Retrieve from Local storage
    var userHighScores = {
        userArray: []
    };
    if (localStorage.getItem("high-scores") !== null) {
        console.log("Retrieving existing localdata...");
        userHighScores = JSON.parse(localStorage.getItem("high-scores"));
    }
    console.log("Before pushing:" + userHighScores.userArray);
    // console.log("Before pushing JSON has:" + JSON.parse(localStorage.getItem("high-scores")));
    // console.log("Before pushing localStorage has:" + (localStorage.getItem("high-scores")));
    // 2. Record new user score
    var user = {
        initials: document.getElementById("initials").value,
        score: currentScore
    };
    // 3. Add latest score
    console.log("Pushing score=" + user.score + "for user=" + user.initials);
    userHighScores.userArray.push(user);
    console.log("After pushing:" + userHighScores.userArray);
    // 3. Store back in localStorage.
    localStorage.setItem("high-scores", JSON.stringify(userHighScores));
    // alert("Saved!");
    UpdateHighScores();
    event.preventDefault(); // prevent browser from refreshing page
}

function handleChoiceButtons(event) {
    if (event.target.id.includes("choice-button-")) {
        // Determine on right/wrong and then "yay/nay"
        if (event.target.textContent.trim() === quizQuestion[currentQuestion].correctAnswer) {
            // alert("Correct!");
            currentScore++;
        } else {
            secondsLeft.decrementValue(4); // decrement timer on wrong answer
        }
        // Display next question till we have more
        if (currentQuestion < quizQuestion.length - 1) {
            renderQuestion(quizQuestion[++currentQuestion]);
        } else {
            // Render all-done screen when 
            // last question has been clicked
            // through
            renderAllDoneScreen("All done!");
        }
    }
}

function handleStartButton(event) {
    // Clear div for 1st question
    deleteButton(event.target);
    // Create placeholders for rendering questions
    renderInitialPlaceholders();
    // Display first question
    renderQuestion(quizQuestion[currentQuestion]);
    // start the quiz timer
    startQuestionTimer();
}
// HANDLERS -----------------------------
// INIT -----------------------------
function initApplication() {
    // Init globals
    currentQuestion = 0;
    currentScore = 0;
    // Register handler for nav-bar view-hs
    var navBarViewHsElem = document.getElementById("view-hs-navbar");
    navBarViewHsElem.onclick = function() {
        document.getElementById("high-scores-modal").style.display = "block";
    }

    // register handler for modal close
    var modalCloseSpan = document.getElementById("span-close");
    modalCloseSpan.onclick = function() {
        document.getElementById("high-scores-modal").style.display = "none";
    }

    // Pull up High-Scores
    UpdateHighScores();
    // Initialize welcome screen
    var startQuizButton = createButton("START QUIZ");
    startQuizButton.addEventListener("click", handleStartButton);
}
// INIT -----------------------------
// MAIN
initApplication();