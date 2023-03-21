//HTML elements
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

// Audio vars
const fanfare = new Audio("./assets/audio/fanfare.mp3");
const correctSFX = new Audio("./assets/audio/correct.mp3");
const incorrectSFX = new Audio("./assets/audio/incorrect.mp3");
const music = new Audio("./assets/audio/music.mp3");

// Global Variables

// Default starting time for quiz
var timerStart = 60;
// Timer var that is subtracted in interval and displayed on page
var timerCountDown;
// Storage for interval object
var gameTimerObject;
// Var for current question; triggers game over when greater than questionBank.length
var questionIndex = 0;
// Bool used to help replay game by pressing the play button instead of going to the high scores screen
var gamePlayed = false;

// Array of question objects. "correctIndex" indicates the correct answer.
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

// Initializes game
function playGame() {
    // If user's first time playing since page load:
    if (gamePlayed === false){
        // Set music volume to lower, skips blank space in song, and plays music
        music.volume = .3;
        music.currentTime = 1;
        music.play();
        // disable play button to prevent errors until end of game
        $(".play-btn").prop("disabled", true);
        // see startTimer function for more details
        startTimer();
        gamePlayed = true;
        // hides Bernard
        bernardBox.hide();
        // displays gamebox where question and answers will be dynamically created
        gameBox.css("display", "flex");
        // see nextQuestion function for more details
        nextQuestion();
        // if game has already been played since page load: 
    }else{
        // reset timer
        timerCountDown = timerStart;
        // turn off score entry box
        scoreEntryBox.css("display", "none");
        // reset bool
        gamePlayed = false;
        // go back to first question
        questionIndex = 0;
        // remove dynamically created content
        yourScoreCont.children().remove();
        answersList.children().remove();
        questionBox.children().remove();
        // stop fanfare if still continuing
        fanfare.pause();
        // reset fanfare music for next play through 
        fanfare.currentTime = 0;
        // reinitialize game
        playGame();
    }
}

// starts in-game timer
function startTimer() {
    // sets timer to equal to default starting time 
    timerCountDown = timerStart;
    // print initial timer value to page
    timer.text(timerCountDown.toString());
    // begin interval; decrease timer by 1; print new timer value; begin end game function if timer <= 0
    gameTimerObject = setInterval(function() {
        timerCountDown--;
        timer.text(timerCountDown.toString());
        if (timerCountDown <= 0) {
            endGame();
            return;
        }
    }, 1000)
}

// function to add new question and answers to screen
function nextQuestion() {
    // create new <p> element and set text to question from question object
    var newQuestion = `<p> ${questionBank[questionIndex].question} </p>`;
    // append question to question box container
    questionBox.append(newQuestion);
    // make question box visible
    questionBox.css("display", "flex");
    // create new li's from answers array in question object; give each answer index data; print to screen
    for (i = 0; i < questionBank[questionIndex].answers.length; i++){
        var answer = $("<li class='answer'></li>");
        answer.attr("data-index", i);
        answer.text(`${questionBank[questionIndex].answers[i]}`);
        answersList.append(answer);
    };
}

// check user click to make sure it's on an answer; if so, run answerQuestion function
answersList.on("click", ".answer", answerQuestion);

// checks user's answer
function answerQuestion(e) {
    // prevent bubbling up
    e.stopPropagation();
    
    // checks to see if target of click is correct answer based on data-index
    if($(e.target).attr("data-index") == questionBank[questionIndex].correctIndex) {
        // if SFX already playing, pause and reset
        if (correctSFX.play()) {
            correctSFX.pause();
            correctSFX.currentTime = 0;
        }
        // play correct SFX
        correctSFX.play();
        // add 10 seconds to timer
        timerCountDown += 10;
    }
    // if answer is incorrect:
    else{
        // if incorrect SFX is already playing, pause and reset
        if (incorrectSFX.play()) {
            incorrectSFX.pause();
            incorrectSFX.currentTime = 0;
        }
        // play SFX
        incorrectSFX.play();
        // subtract time from timer
        timerCountDown -= 5;
    }

    // after correct/incorrect check, clear question and answers from containers 
    $(questionBox).children().remove();
    $(answersList).children().remove();

    // increase question index to move to next question
    questionIndex++;

    // if new index is above length of question array, begin endGame function. If not, display next question.
    if ((questionIndex + 1) > questionBank.length)
    {
        endGame();
    }
    else {
        nextQuestion();
    }
}

function endGame() {
    // stop timer
    clearInterval(gameTimerObject);
    // pause in-game music
    music.pause();
    // hide game box
    gameBox.css("display", "none");
    // display score entry container
    scoreEntryBox.css("display", "flex");
    // create new <p> for player's score to be dynamically added
    var endScore = $("<p></p>");
    // set new <p> value to player's score
    endScore.text(timerCountDown);
    // print to screen
    yourScoreCont.append(endScore);
    // re-enable play button to allow user to play new game without having to enter score if they wish
    $(".play-btn").prop("disabled", false);
    // set fanfare SFX volume
    fanfare.volume = .3;
    // play fanfare for score entry
    fanfare.play();
}

submitScoreBtn.on("click", postScore);


// grabs local storage of scores, adds new score, and pushes back to local storage
function postScore(e) {

    // prevent submit from reloading page
    e.preventDefault();

    // get local storage array; if none, create empty array
    var localHighScores = JSON.parse(localStorage.getItem("playerScore")) || [];

    // create new object with players inputted initials and scores
    var playerScore = {
        initials: scoreInput.val().trim(),
        score: timerCountDown
    };

    // add new object to array
    localHighScores.push(playerScore);

    // place new array in local storage
    localStorage.setItem("playerScore", JSON.stringify(localHighScores));
}