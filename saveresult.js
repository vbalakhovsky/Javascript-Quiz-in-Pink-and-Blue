const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const Max_High_Scores = 7;


finalScore.innerText = mostRecentScore;



username.addEventListener("keyup", () => {console.log(username.value);
saveScoreBtn.disabled = ! username.value;

});


saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
  highScore.push(score);
  highScore.sort( (a, b) => b.score - a.score)
  highScore.splice(7);
  localStorage.setItem("highScore", JSON.stringify(highScore));
 window.location.assign("/");
};