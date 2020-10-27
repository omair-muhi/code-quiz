// GLOBAL DATA
// Static array of objects containing quiz questions
var quizQuestion = [{
        questionString: "What is HTML an acronym for?",
        choices: ["Hyper Text Markup Language", "Highly Tuned Machine Learning", "Hollywood Themed Markup Language"]
    },
    {
        questionString: "What is CSS an acronym for?",
        choices: ["Coding Style System", "Canadian Social Standards", "Cascading Style Sheets"]
    },
    {
        questionString: "What is another name for Javascript?",
        choices: ["HTTPscript", "ECMAscript", "WEBscript"]
    },

    {
        questionString: "What type of braces does Javascripts use to declare a list?",
        choices: ["Square braces", "Curly braces", "Round braces"]
    },
    {
        questionString: "What type of braces does Javascripts use to declare an object?",
        choices: ["Square braces", "Curly braces", "Round braces"]
    }
]
var currentQuestion = 0;
// GLOBAL DATA
// BUTTONS
function createButton(buttonString) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = buttonString;
    document.getElementById("dynamic-content").appendChild(btn);
    return btn;
}

function deleteButton(buttonObject) {
    document.getElementById("dynamic-content").removeChild(buttonObject);
}
// BUTTONS
// RENDERING
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
    // add a handler for buttons
    olTag.addEventListener("click", handleChoiceButtons);
}

function renderQuestion(questionObject) {
    // update question string in <H> element
    document.getElementById("quiz-question").innerText = questionObject.questionString;
    // update button text
    for (var i = 0; i < questionObject.choices.length; i++) {
        document.getElementById("choice-button-" + i).innerHTML = questionObject.choices[i];
    }
}
// RENDERING
// HANDLERS
function handleChoiceButtons(event) {
    // Display next question till we have more
    if (currentQuestion < quizQuestion.length)
        renderQuestion(quizQuestion[currentQuestion++]);
    else {
        // 1. Update <h3>, Delete <ol>
        document.getElementById("quiz-question").innerText = "All done!";
        var olTag = document.getElementById("quiz-choices");
        document.getElementById("dynamic-content").removeChild(olTag);
        // 2. Render input-form as prompt to enter initials
        // 3. Create 
    }

}
var timerObject = null;
var secondsLeft = 6;

function timerHandler() {
    secondsLeft--;
    var timerTextTag = document.getElementById("timer-text");
    if (secondsLeft <= 0) {
        // re-initialize for next time
        secondsLeft = 6;
        // clear timer
        clearInterval(timerObject);
        // reset #timer-text
        timerTextTag.innerText = "00:00";
        // move to next question till we have more
        if (currentQuestion < quizQuestion.length) {
            renderQuestion(quizQuestion[currentQuestion++]);
            // restart timer
            startQuestionTimer();
        }
    } else {
        // update #timer-text
        timerTextTag.innerText = "00:" + (secondsLeft > 9 ? secondsLeft : ("0" + secondsLeft));
    }
}

function startQuestionTimer() {
    timerObject = setInterval(timerHandler, 1000);
}

function handleStartButton(event) {
    // start timer
    startQuestionTimer();
    // alert("Starting the quiz now...");
    deleteButton(event.target);
    // Create placeholders for rendering questions
    renderInitialPlaceholders();
    // Display first question
    renderQuestion(quizQuestion[currentQuestion++]);
}
// HANDLERS
// INIT
function initApplication() {
    // Initialize welcome screen
    var startQuizButton = createButton("START QUIZ");
    startQuizButton.addEventListener("click", handleStartButton);
}
// MAIN
initApplication();