const bernardBox = $("#bernard-box");
const playButton = $(".play-btn");
const scoreboardButton = $(".score-btn");
const gameBox = $("#game-box");
const timer = $("#timer-display");


var timerStart = 60;
var timerCountDown;
var gameTimer;

var questionBank = [
    qOne = {
        question: "While the word 'friend' opens the door to the mines of Moria in the Fellowship of the Ring, what language must it be spoken in?",
        answers: ["dwarvish", "common tongue", "elvish", "black tongue"],
        correctIndex: 2
    },

    qTwo = {
        question: "In the Discworld series, what is Death's favorite animal?",
        answers: ["cats", "rats", "ravens", "dogs"],
        correctIndex: 0
    },

    qThree = {
        question: "In Harry Potter and the Sorceror's Stone, what word backwards is the name bestowed upon a mirror that will show you what you want most?",
        answers: ["wish", "desire", "treasure", "fortune"],
        correctIndex: 1
    },

    qFour = {
        question: "In the Wheel of Time series, what is the half of the power that males can wield?",
        answers: ["Saidar", "Callandor", "Callaondir", "Saidin"],
        correctIndex: 3
    },

    qFive = {
        question: "What mythical group does Kvothe seek after they murdered his parents in The Name of the Wind?",
        answers: ["Fae", "Severan", "Edema", "Chandrian"],
        correctIndex: 3
    },

    qSix = {
        question: "In the Sword of Truth series, Kahlan Amnell possesses the power of what magical order of women?",
        answers: ["Bone Readers", "Mord-sith", "Confessors", "Gars"],
        correctIndex: 2
    },

    qSeven = {
        question: "What is the surname of the main family of children who enter Narnia in The Lion, The Witch, and the Wardrobe?",
        answers: ["Pevensie", "Kirke", "Scrubb", "Pole"],
        correctIndex: 0
    },

    qEight = {
        question: "Bartimaeus, from the Bartimaeus Sequence, belongs to which class of demon?",
        answers: ["Afrit", "Naeryan", "Jabor", "Djinn"],
        correctIndex: 3
    },

    qNine = {
        question: "In Redwall, young mouse monk Matthias must confront a venomous adder named what?",
        answers: ["Clooney", "Asmodeus", "Vilu", "Tsarmina"],
        correctIndex: 1
    },

    qTen = {
        question: "Which house bears the motto 'We do not Sow' in the Song of Ice and Fire series?",
        answers: ["Stark", "Greyjoy", "Lannister", "Baratheon"],
        correctIndex: 1
    }
]

playButton.on("click", playGame);

// TODO: set display to "none", disable play button
function playGame() {
    bernardBox.hide();
    gameBox.css("display", "flex");
    startTimer();
}

function startTimer() {
    timerCountDown = timerStart;
    gameTimer = setInterval(function () {
        timerCountDown--;
        timer.text(timerCountDown.toString());
        if (timerCountDown <= 0) {
            clearInterval(gameTimer);
            endGame();
            return;
        }
    }, 1000)
}

function endGame() {
    //end time interval         clearInterval(timerInterval);
    //disable gamebox
    //enable score entry
}

function nextQuestion() {
    //increase question index     
    //display question
    //for loop to display answers
    // for (var i = 0; i < todos.length; i++) {
//     var todo = todos[i];

//     var li = document.createElement("li");
//     li.textContent = todo;
//     li.setAttribute("data-index", i);

//     var button = document.createElement("button");
//     button.textContent = "Complete ✔️";

//     li.appendChild(button);
//   }
}

function postScore() {
// function init() {
//     // Get stored todos from localStorage
//     var storedTodos = JSON.parse(localStorage.getItem("todos"));
  
//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedTodos !== null) {
//     }
  
//     // This is a helper function that will render todos to the DOM
//     renderTodos();
//   }
// signUpButton.addEventListener("click", function(event) {
//     event.preventDefault();
    
//     // create user object from submission
//     var user = {
//       firstName: firstNameInput.value.trim(),
//       lastName: lastNameInput.value.trim(),
//       email: emailInput.value.trim(),
//       password: passwordInput.value.trim()
//     };
  
//     // set new submission to local storage 
//     localStorage.setItem("user", JSON.stringify(user));
    
//   });
}

function getScore() {
   //ar email = localStorage.getItem("email");
//     var password = localStorage.getItem("password");
  
//     if (!email || !password) {
//       return;
//     }
  
//     userEmailSpan.textContent = email;
//     userPasswordSpan.textContent = password;
//   }
}









/* 

function displayQuestion() {
    main.innerHTML= "";
    var h1El = document.createElement("h1");
    h1El.textContent = questions[questionIndex].questionText;
    mainEl.appendChild(h1El);
    
    for (var i = 0; i < questions[questionIndex].questionChoice.length; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = questions[questionIndex].questionChoices[i];
        button add class 
        mainEl.appendChild(buttonEl);
    }
    questions[questionIndex].questionChoices
    
    questionIndex++;

}
*/