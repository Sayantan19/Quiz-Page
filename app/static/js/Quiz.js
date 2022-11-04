import data from '/student/quiz/question' assert { type: 'json' };

//To set the number of questions
const NoOfQuestions = Number(data['Question_settings']['quizquestions'])
//To set the time
const timerValue = NoOfQuestions*Number(data['Question_settings']['questiontime']);



// To open the question palette
const openBtn = document.getElementById("open");
openBtn.addEventListener('click', openNav)
function openNav() {
    document.getElementById("mySidebar").style.width = "400px";
    document.getElementById("main").style.marginRight = "350px";
    document.getElementById("timer").style.marginRight = "400px";
    document.getElementById("timer").style.marginLeft = "0px";
    document.getElementById("timer").style.width = "10%";
    document.getElementById("timer").style.fontSize = "20px";
    document.getElementById("heading").style.width = "40%";
    document.getElementById("main").style.transition = "0.5s";
    document.getElementById("timer").style.transition = "0.5s";
}

//To close the question palette
const closeBtn = document.getElementById("close");
closeBtn.addEventListener('click', closeNav)
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("timer").style.marginRight = "0";
    document.getElementById("timer").style.marginLeft = "2%";
    document.getElementById("timer").style.fontSize = "36px";
    document.getElementById("timer").style.width = "35%";
    document.getElementById("heading").style.width = "60%";
    document.getElementById("timer").style.transition = "0.5s";
    document.getElementById("main").style.transition = "0.5s";
}

//This is for the question palette button functionality
// const q1 = document.getElementById("1");
// q1.addEventListener('click', () => { count = 0; loadQuiz(); });
// const q2 = document.getElementById("2");
// q2.addEventListener('click', () => { count = 1; loadQuiz(); });
// const q3 = document.getElementById("3");
// q3.addEventListener('click', () => { count = 2; loadQuiz(); });
// const q4 = document.getElementById("4");
generatePalette()
function generatePalette()
{
    var but = document.getElementById("buttons")
    for(let i=0;i<NoOfQuestions;i++)
    {
        but.insertAdjacentHTML("beforeend",`<button type="button" class="button btn btn-success ${i}" id="palette_button" id-type='2' onClick="(function(){count = ${i-1}; loadQuiz();})()">${i+1}</button>`)
    }
}

var x = document.getElementById('palette_button');
x.addEventListener('click', () => { console.log(x.textContent); count = Number(x.textContent)-1; loadQuiz(); });

var totalSeconds;
//Initializing the time at the beginning of the quiz
let time = localStorage.getItem('saved_timer');
if (time == null) {
    const saved_timer = new Date().getTime() + (timerValue * 1000);
    localStorage.setItem('saved_timer', saved_timer);
    time = saved_timer;
}

//To update the time
const timerID = setInterval(timeUpdate, 1000);
//This is the function which updates the time
function timeUpdate() {
    const now = new Date().getTime();
    const difference = time - now;

    totalSeconds = Math.floor(difference / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.querySelector("#timer").innerText = 'Time Left: ' + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    //Changes if the time ends
    if (totalSeconds <= 0) {
        alert("TIME'S UP!!!");
        clearInterval(timerID);
        localStorage.removeItem('saved_timer');
        calculateMarks();
        closeNav();

        quiz.innerHTML = `
        <div class="container" id="end">
        <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${4 * NoOfQuestions}</h2></p>
        <form action="/student/end" method="post">
        <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}">
        <input id="hideme" name="studentTime" type="text" value="${(timerValue - totalSeconds).toString()}">
        <input class="btn btn-outline-dark" type="submit">
        </form>
        </div>
        `
    }
}

// //The question set is stored in 'quizData'
const quizData = data['quizData'];
console.log(quizData)
const quiz = document.getElementById('quiz')
//Various elements of the question to be displayed in the page.
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')

//Button for various purposes
const submitBtn = document.getElementById('submit')
const resetBtn = document.getElementById('reset')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')

//Variables for manipulation and navigation of the questions
let visited = new Array(quizData.length).fill(0)
let selector = new Array(NoOfQuestions).fill(0)
let answerList = new Array(NoOfQuestions).fill('n')
let currentQuiz = 0
let correctscore = 0
var count = 0;

//This function selects the questions from a pool of n number of questions stored in the .json file
QuestionSelector()
function QuestionSelector() {
    let i = 0
    while (i < NoOfQuestions) {
        let x = Math.floor(Math.random() * quizData.length);
        if (visited[x] == 0) {
            selector[i] = x;
            visited[x] = 1;
            i++;
        }
    }
    console.log(selector)
}

//Used to display the questions on the screen
loadQuiz()
function loadQuiz() {
    if (count == 0)
        document.querySelector('#prev').disabled = true;
    else
        document.querySelector('#prev').disabled = false;
    if (answerList[count] == 'n')
        deselectAnswers()
    else
        document.getElementById(answerList[count]).checked = true;
    currentQuiz = selector[count];

    document.getElementById("qno").innerHTML = (count + 1);
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

//function to deselect all the options.
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

//This is used to select the option that the user clicks
function getSelected() {
    let answer
    let flag = 0
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
            flag = 1
        }
    })
    if (flag == 1)
        return answer
    else
        return 'n'
}


//For looping through the questions
function updateQ() {
    if (count < NoOfQuestions) {
        loadQuiz()
    }
}

//This function adds the functionality to the submit button
submitBtn.addEventListener('click', onSubmit)
function onSubmit() {
    console.log(answerList)
    if (confirm("Do you want to Submit the quiz?") == true) {
        calculateMarks()
        clearInterval(timerID);
        localStorage.removeItem('saved_timer');
        closeNav();
        quiz.innerHTML = `
        <div class="container" id="end">
        <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${4 * NoOfQuestions}</h2></p>
        <form action="/student/end" method="post">
        <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}" >
        <input id="hideme" name="studentTime" type="text" value="${(timerValue - totalSeconds).toString()}" >
        <input class="btn btn-outline-dark" type="submit">
        </form>
        </div>
        `
    }
}

//Adds functionality to the next button
nextBtn.addEventListener('click', onNext)
function onNext() {
    answerList[count] = getSelected()
    if (count == NoOfQuestions - 1)
        count = 0;
    else
        count++;
    updateQ()
    console.log(answerList)
}

//Adds functionality to the previous button
prevBtn.addEventListener('click', onPrev)
function onPrev() {
    answerList[count] = getSelected()
    count--;
    updateQ()
    console.log(answerList)
}

//Adds functionality to the reset button
resetBtn.addEventListener('click', onReset)
function onReset() {
    deselectAnswers()
}

//For calculating the marks obtained by the user
function calculateMarks() {
    for (let i = 0; i < answerList.length; i++) {
        if (answerList[i] === quizData[selector[i]].correct)
            correctscore += 4;
        else if (answerList[i] === 'n')
            correctscore += 0;
        else
            correctscore--;
    }
}


