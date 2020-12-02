// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is JavaScript?",
        
        choiceA : "JavaScript is a scripting or programming language that allows you to implement complex features on web page",
        choiceB : "JavaScript adds styles like fonts and colors to websites",
        choiceC : "JavaScript describes the structure of a Web page. JavaScript consists of a series of elements and tells the browser how to display the content",
        choiceD : "JavaScipt is the latest model of Cappuccino maker prefferred by software developers",
        correct : "A"
    },{
        question : "What is the command to remove the last element of an array?",
      
        choiceA : "removeLast",
        choiceB : "pop",
        choiceC : "push",
        choiceD : "Once declared arrays cannot be changed",
        correct : "B"
    },{
        question : "What is Bootstrap?",
        
        choiceA : "Bootstrap is an algorithm used to program life-like events",
        choiceB : "Bootstrap is a programming language",
        choiceC : "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front",
        choiceD : "Bootstrap is a phycological technique used by software designers for staying focused during debugging",
        correct : "C"
    }

    ,{
        question : "How do you convert an object into a string?",
        
        choiceA : "by declaring it as a string",
        choiceB : "you have to manually change it",
        choiceC : "by using JSON stringify",
        choiceD : "it cannot be done",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
   
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the score of the player
    const yourscore = score*10;
localStorage.setItem("mostRecentScore", yourscore);
    scoreDiv.innerHTML += "Your score is " + yourscore + " points";
}
