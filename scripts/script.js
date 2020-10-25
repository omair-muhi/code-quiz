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

function createButton(buttonString) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = buttonString;
    document.getElementById("dynamic-content").appendChild(btn);
    return btn;
}

function deleteButton(buttonObject) {
    document.getElementById("dynamic-content").removeChild(buttonObject);
}

function handleStartButton(event) {
    alert("Starting the quiz now...");
    deleteButton(event.target);
}

function renderQuestion(questionObject) {

}

function initApplication() {

    // Initialize welcome screen
    var startQuizButton = createButton("START QUIZ");
    startQuizButton.addEventListener("click", handleStartButton);
    // Display first question

}

initApplication();