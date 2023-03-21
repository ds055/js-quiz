// List to which high scores will be appended
const highScoreList = $("#high-score-list")

// music for page
const music = new Audio("./assets/audio/highscore.mp3");

// init function
getScore();


function getScore() {

    // set volume for on page music
    music.volume = .3;

    // plays music
    music.play();

    // loops music
    music.loop = true;

    // retrieve high scores from local storage; create empty array if none
    var scoreArr = JSON.parse(localStorage.getItem("playerScore")) || [];

    //create var array to store sorted scores
    var sortedScores = scoreArr.sort(sortArray);

    //trim array to top 10 items
    sortedScores.splice(10);

    // loops through retrieved data; creates li; sets li to scores array; appends to high score list
    for (var i = 0; i < sortedScores.length; i++){
        var liScore =  $("<li></li>");
        liScore.text(`${sortedScores[i].initials} ....... ${sortedScores[i].score}`);
        highScoreList.append(liScore);
    }

    // stores sorted and trimmed array to local 
    JSON.stringify(localStorage.setItem("playerScore", JSON.stringify(sortedScores)));
}

//sort function to order scores high to low
function sortArray(playerScore1, playerScore2) {
    return playerScore2.score - playerScore1.score;
}