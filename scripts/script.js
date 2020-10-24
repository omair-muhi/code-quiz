// Adapted from: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement2
function myFunction() {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "START QUIZ";
    document.body.appendChild(btn);
  }
  