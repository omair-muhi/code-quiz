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
    document.getElementById("quiz-question").innerText = doneString + "You scored: " + currentScore + "/" + quizQuestion.length;
    var olTag = document.getElementById("quiz-choices");
    document.getElementById("dynamic-content").removeChild(olTag);
    // 2. Render input-form as prompt to enter initials
    // create <form>
    var formTag = document.createElement("FORM");
    document.getElementById("dynamic-content").appendChild(formTag);
    // create <label> with attributes
    var labelTag = document.createElement("LABEL");
    labelTag.setAttribute("for", "initials");
    labelTag.innerText = "Enter Your Initials:";
    formTag.appendChild(labelTag);
    // insert <br>
    formTag.appendChild(document.createElement("BR"));
    // create <input> with attributes
    var inputLabel = document.createElement("INPUT");
    inputLabel.setAttribute("type", "text");
    inputLabel.setAttribute("id", "initials");
    inputLabel.setAttribute("name", "initials");
    inputLabel.setAttribute("value", "AA");
    formTag.appendChild(inputLabel);
    // create <input> with submit attribute
    var inputSubmit = document.createElement("INPUT");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "Submit");
    inputSubmit.setAttribute("id", "submit-initials");
    formTag.appendChild(inputSubmit);
    // register event listener for submit button
    document.getElementById("submit-initials").addEventListener("click", handleSubmitInitialsButton);
}

function renderQuestion(questionObject) {
    // update question string in <H> element
    document.getElementById("quiz-question").innerText = questionObject.questionString;
    // update button text
    for (var i = 0; i < questionObject.choices.length; i++) {
        document.getElementById("choice-button-" + i).innerHTML = questionObject.choices[i];
    }
    // start the timer
    startQuestionTimer();
}
// RENDERING -----------------------------
// TIMER -----------------------------
var questionTimer = null;
var secondsLeft = {
    value: 5,
    getValue: function() { return this.value; },
    resetValue: function() { this.value = 5; },
    decrementValue: function() { this.value--; }
};

function timerHandler() {
    secondsLeft.decrementValue();
    if (secondsLeft.getValue() <= 0) {
        // move to next question till we have more
        if (currentQuestion < quizQuestion.length - 1) {
            renderQuestion(quizQuestion[++currentQuestion]);
        } else {
            // Handle timer-expiry on last question
            renderAllDoneScreen("You ran out of time!");
        }
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
    // clear and restart timer
    clearInterval(questionTimer);
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
var userHighscores = [];

function handleSubmitInitialsButton(event) {
    event.preventDefault();
    var user = {};
    user.initials = document.getElementById("initials").value;
    user.score = currentScore;

}

function handleChoiceButtons(event) {
    if (event.target.id.includes("choice-button-")) {
        // Determine on right/wrong and then "yay/nay"
        if (event.target.textContent.trim() === quizQuestion[currentQuestion].correctAnswer) {
            // alert("Correct!");
            currentScore++;
        } else {
            // alert("Incorrect.");
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
}
// HANDLERS -----------------------------
// INIT -----------------------------
function initApplication() {
    // Initialize welcome screen
    var startQuizButton = createButton("START QUIZ");
    startQuizButton.addEventListener("click", handleStartButton);
}
// INIT -----------------------------
// MAIN
initApplication();