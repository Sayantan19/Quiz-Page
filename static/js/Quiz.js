/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
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

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
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

const timerValue = 1800; // this value is in seconds
var totalSeconds;

let time = localStorage.getItem('saved_timer');
if (time == null) {
    const saved_timer = new Date().getTime() + (timerValue * 1000);
    localStorage.setItem('saved_timer', saved_timer);
    time = saved_timer;
}

const timerID = setInterval(timeUpdate, 1000);

function timeUpdate() {
    const now = new Date().getTime();
    const difference = time - now;


    totalSeconds = Math.floor(difference / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.querySelector("#timer").innerText = 'Time Left: ' + minutes + ':' + ((seconds < 10) ? '0' + seconds : seconds);

    if (totalSeconds <= 0) {
        alert("TIME'S UP!!!");
        clearInterval(timerID);
        localStorage.removeItem('saved_timer');
        quiz.innerHTML = `
        <div class="container" id="end">
        <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${quizData.length * 4}</h2></p>
        <form action="/end" method="post">
        <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}">
        <input id="hideme" name="studentTime" type="text" value="${(timerValue - totalSeconds).toString()}">
        <input class="btn btn-outline-dark" type="submit">
        </form>
        </div>
        `
    }
}

const quizData = [
    {
        question: "Identify the correct range of signed char.",
        a: "-256 to 255",
        b: "-128 to 127",
        c: "0 to 255",
        d: "0 to 127",
        correct: "b",
    },

    {
        question: "In a graph of n nodes and n edges, how many cycles will be present?",
        a: "Exactly 1",
        b: "At most 1",
        c: "At most 2",
        d: "Depends on the graph",
        correct: "a",
    },

    {
        question: "Using which of the following keywords can an exception be generated?",
        a: "threw",
        b: "throws",
        c: "throw",
        d: "catch",
        correct: "c",
    },

    {
        question: "The headquarters of Amazon company are located in-",
        a: "California",
        b: "Seattle",
        c: "New York",
        d: "Detroit",
        correct: "b",

    },

    {
        question: "A computer cannot 'boot' if it does not have the: ",
        a: "Compiler",
        b: "Loader",
        c: "Operating system",
        d: "Assembler",
        correct: "c",
    },

    {
        question: "Among the following which is not a database management software",
        a: "MySQL",
        b: "COBOL",
        c: "Sybase",
        d: "Oracle",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const resetBtn = document.getElementById('reset')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')

let visited = new Array(quizData.length).fill(0)
let selector = new Array(4).fill(0)
let answerList = new Array(4).fill('n')
let currentQuiz = 0
let correctscore = 0
var count = 0;

QuestionSelector()
function QuestionSelector() {
    let i = 0
    while (i <= 3) {
        let x = Math.floor(Math.random() * quizData.length);
        if (visited[x] == 0) {
            selector[i] = x;
            visited[x] = 1;
            i++;
        }
    }
    console.log(selector)
}

loadQuiz()

function loadQuiz() {
    if (count == 0)
        document.querySelector('#prev').disabled = true;
    else
        document.querySelector('#prev').disabled = false;
    if (count == 3)
        document.querySelector('#next').disabled = true;
    else
        document.querySelector('#next').disabled = false;
    deselectAnswers()
    currentQuiz = selector[count];

    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

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

function isAllVisited() {
    for (let index = 0; index < visited.length; index++) {
        if (visited[index] == 0)
            return 0
    }
    return 1
}

function updateQ() {
    if (count <= 3) {
        loadQuiz()
    }
}

submitBtn.addEventListener('click', onSubmit)
function onSubmit() {
    answerList[count] = getSelected()
    console.log(answerList)
    if (confirm("Do you want to Submit the quiz?") == true) {
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i] === quizData[selector[i]].correct)
                correctscore += 4;
            else if (answerList[i] === 'n')
                correctscore += 0;
            else
                correctscore--;
        }
        clearInterval(timerID);
        localStorage.removeItem('saved_timer');
        quiz.innerHTML = `
        <div class="container" id="end">
        <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${4 * 4}</h2></p>
        <form action="/end" method="post">
        <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}" >
        <input id="hideme" name="studentTime" type="text" value="${(timerValue - totalSeconds).toString()}" >
        <input class="btn btn-outline-dark" type="submit">
        </form>
        </div>
        `
    }
}

nextBtn.addEventListener('click', onNext)
function onNext() {
    answerList[count] = getSelected()
    count++;
    updateQ()
    console.log(answerList)
}
prevBtn.addEventListener('click', onPrev)
function onPrev() {
    answerList[count] = getSelected()
    count--;
    updateQ()
    console.log(answerList)
}

resetBtn.addEventListener('click', onReset)
function onReset() {
    deselectAnswers()
}




