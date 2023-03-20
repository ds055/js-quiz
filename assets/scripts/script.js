const bernardBox = $("#bernard-box");
const playButton = $(".play-btn");
const scoreboardButton = $(".score-btn");
const gameBox = $("#game-box");
const timer = $("#timer-display");
const answersList = $(".answers-list");
const questionBox = $(".question-box");
const scoreInput = $("#score-input")
const submitScoreBtn = $("#submit-score-btn")
const scoreEntryBox = $("#score-entry-container");
const yourScoreCont = $("#your-score-container")

const fanfare = new Audio("./assets/audio/fanfare.mp3");
const correctSFX = new Audio("./assets/audio/correct.mp3");
const incorrectSFX = new Audio("./assets/audio/incorrect.mp3");
const music = new Audio("./assets/audio/music.mp3");

var timerStart = 60;
var timerCountDown;
var gameTimerObject;
var questionIndex = 0;
var gamePlayed = false;

var questionBank = [
    qOne = {
        question: "While the word 'friend' opens the door to the mines of Moria in the Fellowship of the Ring, what language must it be spoken in?",
        answers: ["dwarvish", "common tongue", "elvish", "black tongue"],
        correctIndex: 2
    },

    // qTwo = {
    //     question: "In the Discworld series, what is Death's favorite animal?",
    //     answers: ["cats", "rats", "ravens", "dogs"],
    //     correctIndex: 0
    // },

    // qThree = {
    //     question: "In Harry Potter and the Sorceror's Stone, what word backwards is the name bestowed upon a mirror that will show you what you want most?",
    //     answers: ["wish", "desire", "treasure", "fortune"],
    //     correctIndex: 1
    // },

    // qFour = {
    //     question: "In the Wheel of Time series, what is the half of the power that males can wield?",
    //     answers: ["Saidar", "Callandor", "Callaondir", "Saidin"],
    //     correctIndex: 3
    // },

    // qFive = {
    //     question: "What mythical group does Kvothe seek after they murdered his parents in The Name of the Wind?",
    //     answers: ["Fae", "Severan", "Edema", "Chandrian"],
    //     correctIndex: 3
    // },

    // qSix = {
    //     question: "In the Sword of Truth series, Kahlan Amnell possesses the power of what magical order of women?",
    //     answers: ["Bone Readers", "Mord-sith", "Confessors", "Gars"],
    //     correctIndex: 2
    // },

    // qSeven = {
    //     question: "What is the surname of the main family of children who enter Narnia in The Lion, The Witch, and the Wardrobe?",
    //     answers: ["Pevensie", "Kirke", "Scrubb", "Pole"],
    //     correctIndex: 0
    // },

    // qEight = {
    //     question: "Bartimaeus, from the Bartimaeus Sequence, belongs to which class of demon?",
    //     answers: ["Afrit", "Naeryan", "Jabor", "Djinn"],
    //     correctIndex: 3
    // },

    // qNine = {
    //     question: "In Redwall, young mouse monk Matthias must confront a venomous adder named what?",
    //     answers: ["Clooney", "Asmodeus", "Vilu", "Tsarmina"],
    //     correctIndex: 1
    // },

    // qTen = {
    //     question: "Which house bears the motto 'We do not Sow' in the Song of Ice and Fire series?",
    //     answers: ["Stark", "Greyjoy", "Lannister", "Baratheon"],
    //     correctIndex: 1
    // }
]

playButton.on("click", playGame);

// TODO: set display to "none", disable play button
function playGame() {
    if (gamePlayed === false){
        music.volume = .3;
        music.currentTime = 1;
        music.play();
        $(".play-btn").prop("disabled", true);
        startTimer();
        gamePlayed = true;
        bernardBox.hide();
        gameBox.css("display", "flex");
        nextQuestion();
    }else{
        timerCountDown = timerStart;
        scoreEntryBox.css("display", "none");
        gamePlayed = false;
        questionIndex = 0;
        yourScoreCont.children().remove();
        answersList.children().remove();
        questionBox.children().remove();
        fanfare.pause();
        fanfare.currentTime = 0;
        playGame();
    }
    

}

function startTimer() {
    timerCountDown = timerStart;
    timer.text(timerCountDown.toString());
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
        correctSFX.play();
        timerCountDown += 10;
    }
    else {
        incorrectSFX.play();
        timerCountDown -= 5;
    }
    $(questionBox).children().remove();
    $(answersList).children().remove();
    questionIndex++;
    if ((questionIndex + 1) > questionBank.length)
    {
        endGame();
    }
    else {
        nextQuestion();
    }
}

function endGame() {
    clearInterval(gameTimerObject);
    music.pause();
    gameBox.css("display", "none");
    scoreEntryBox.css("display", "flex");
    var endScore = $("<p></p>");
    endScore.text(timerCountDown);
    yourScoreCont.append(endScore);
    $(".play-btn").prop("disabled", false);
    fanfare.volume = .3;
    fanfare.play();
}

submitScoreBtn.on("click", postScore);



function postScore(e) {
    e.preventDefault();

    var localHighScores = JSON.parse(localStorage.getItem("playerScore")) || [];


    var playerScore = {
        initials: scoreInput.val().trim(),
        score: timerCountDown
    };

    localHighScores.push(playerScore);

    localStorage.setItem("playerScore", JSON.stringify(localHighScores));
    window.location.replace("../../highscores.html");
}