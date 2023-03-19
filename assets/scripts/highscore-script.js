const highScoreList = $("#high-score-list")

getScore();

function getScore() {
    var scoreArr = JSON.parse(localStorage.getItem("playerScore")) || [];

    console.log(typeof(scoreArr));

    //create var array to store sorted scores
    var sortedScores = scoreArr.sort(sortArray);

    //trim array top 10 items
    sortedScores.splice(10);


    for (var i = 0; i < sortedScores.length; i++){
        var liScore =  $("<li></li>");
        liScore.text(`${sortedScores[i].initials} ....... ${sortedScores[i].score}`);
        highScoreList.append(liScore);
    }

    JSON.stringify(localStorage.setItem("playerScore", JSON.stringify(sortedScores)));
}

//sort function to order scores high to low
function sortArray(playerScore1, playerScore2) {
    return playerScore2.score - playerScore1.score;
}