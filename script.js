
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


let questions = [
    {
        question : "What is JavaScript?",
        
        choiceA : "JavaScript is a scripting or programming language that allows you to implement complex features on web page",
        choiceB : "JavaScript adds styles like fonts and colors to websites",
        choiceC : "JavaScript describes the structure of a Web page. JavaScript consists of a series of elements and tells the browser how to display the content",
        choiceD : "JavaScipt is the latest model of Cappuccino maker preferred by software developers",
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
    },{
        question : "How do you convert an object into a string?",
        
        choiceA : "by declaring it as a string",
        choiceB : "you have to manually change it",
        choiceC : "by using JSON stringify",
        choiceD : "it cannot be done",
        correct : "C"
    }

    ,{
        question : "What does addClass() method do in jQuery?",
        
        choiceA : "it makes everything look classy and elegant",
        choiceB : "it changes the CSS file",
        choiceC : "adds one or more class names to the selected element",
        choiceD : "it changes where the element appears in HTML",
        correct : "C"
    }

    ,{
        question : "What is a loop in JavaScript?",
        
        choiceA : "running a block of code until a certain condition is met",
        choiceB : "a method that allows to avoid obstacles",
        choiceC : "getting an element from storage",
        choiceD : "in inefficient code that takes too long to work",
        correct : "A"
    }
    ,{
        question : "When does a variable have global scope?",
        
        choiceA : "when it has a clear logical name",
        choiceB : "A variable has global scope if it exists during the life of the program and is accessible from anywhere in the program",
        choiceC : "when it affects to way the program works",
        choiceD : "when its value is not affected by changes in other parameters",
        correct : "B"
    }

];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20;
const gaugeWidth = 250; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
   
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}


function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
    
        score++;
     
        answerIsCorrect();
        
       
    }else{
        
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
       
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}


function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "red";
    
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    
    const yourscore = score*10;
localStorage.setItem("mostRecentScore", yourscore);
    scoreDiv.innerHTML += "Your score is " + yourscore + " points";
}
