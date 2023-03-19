const bernardBox = $("#bernard-box");
const playButton = $(".play-btn");
const scoreboardButton = $(".score-btn");
const gameBox = $("#game-box");
const timer = $("#timer-display");
const answersList = $(".answers-list");
const questionBox = $(".question-box")
const cheerSFX = new Audio("./assets/audio/crowd-cheer.mp3");


var timerStart = 99;
var timerCountDown;
var gameTimerObject;
var questionIndex = 0;

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
    $(".play-btn").prop("disabled", true);
    bernardBox.hide();
    gameBox.css("display", "flex");
    nextQuestion();
    startTimer();
}

function startTimer() {
    timerCountDown = timerStart;
    gameTimerObject = setInterval(function() {
        timerCountDown--;
        timer.text(timerCountDown.toString());
        if (timerCountDown <= 0) {
            endGame();
            return;
        }
    }, 1000)
}

function nextQuestion() {
    var newQuestion = `<p> ${questionBank[questionIndex].question} </p>`;
    questionBox.append(newQuestion);
    questionBox.css("display", "flex");
    for (i = 0; i < questionBank[questionIndex].answers.length; i++){
        var answer = $("<li></li>");
        answer.attr("data-index", i);
        answer.text(`${questionBank[questionIndex].answers[i]}`);
        answersList.append(answer);
    };
}

answersList.on("click", answerQuestion);

function answerQuestion(e) {
    e.stopPropagation();
    if($(e.target).attr("data-index") == questionBank[questionIndex].correctIndex) {
        timerCountDown += 10;
    }
    else {
        timerCountDown -= 5;
    }
    $(questionBox).children().remove();
    $(answersList).children().remove();
    questionIndex++;
    console.log(questionIndex);
    console.log(questionBank.length)
    if ((questionIndex + 1) > questionBank.length)
    {
        endGame();
    }
    else {
        nextQuestion();
    }
}

function endGame() {
    console.log("end game")
    clearInterval(gameTimerObject);
    questionBox.css("display", "none");
    //enable score entry
}

function postScore() {
    

// signUpButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     var user = {
//       firstName: firstNameInput.value.trim(),
//       lastName: lastNameInput.value.trim(),
//       email: emailInput.value.trim(),
//       password: passwordInput.value.trim()
//     };
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