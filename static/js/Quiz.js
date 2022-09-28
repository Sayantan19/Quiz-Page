//Declared a set of constants required for future operations

//This constant will search for the ID named 'quiz'in the HTML
const quiz = document.getElementById('quiz')
//This constant will search for the class named 'answer' in the HTML
const answerEls = document.querySelectorAll('.answer')
//This constant will search for the ID named 'question' in the HTML
const questionEl = document.getElementById('question')
//These 4 will retrieve the option texts
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
//This will search for the submit button in the page
const submitBtn = document.getElementById('submit')

//This is the default timer. Time in seconds
const timerValue = 1800;
//This variable calculates the total seconds remaining.
var totalSeconds;

let time = localStorage.getItem('saved_timer');
//Initializes the time variable using the current system time
if (time == null) {
    const saved_timer = new Date().getTime() + (timerValue * 1000);
    localStorage.setItem('saved_timer', saved_timer);
    time = saved_timer;
}

//This keeps updating the time elapsed and displays it on the web page
const timerID = setInterval(() => {
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
        <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${quizData.length*4}</h2></p>
        <form action="/end" method="post">
        <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}">
        <input id="hideme" name="studentTime" type="text" value="${(timerValue-totalSeconds).toString()}">
        <input class="btn btn-outline-dark" type="submit">
        </form>
        </div>
        `
    }
    else if (totalSeconds > 0 && count == 4) {
        console.log(timerValue - totalSeconds);
        clearInterval(timerID);
        localStorage.removeItem('saved_timer');
    }
}, 1000);

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
];



let visited = new Array(quizData.length).fill(0)
let currentQuiz = 0
let correctscore = 0
var count=0;

loadQuiz()

function loadQuiz() {

    deselectAnswers()
    currentQuiz = Math.floor(Math.random() * quizData.length);
    if (visited[currentQuiz] === 0) {
        const currentQuizData = quizData[currentQuiz]
        questionEl.innerText = currentQuizData.question
        a_text.innerText = currentQuizData.a
        b_text.innerText = currentQuizData.b
        c_text.innerText = currentQuizData.c
        d_text.innerText = currentQuizData.d
    }
    else
        loadQuiz();
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

function isAllVisited() {
    for (let index = 0; index < visited.length; index++) {
        if (visited[index] == 0)
            return 0
    }
    return 1
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
        if (answer === quizData[currentQuiz].correct) 
        correctscore+=4;
        else
        correctscore--;
        
        visited[currentQuiz] = 1;
        count++;
        if (isAllVisited() == 0 && count != 4) {
            loadQuiz()
        }
        else {
            quiz.innerHTML = `
            <div class="container" id="end">
                <p id="exitMessage"><h2>You scored <span name="Score">${correctscore}</span>/${30*4}</h2></p>
                <form action="/end" method="post">
                    <input id="hideme" name="studentScore" type="text" value="${correctscore.toString()}" >
                    <input id="hideme" name="studentTime" type="text" value="${(timerValue-totalSeconds).toString()}" >
                    <input class="btn btn-outline-dark" type="submit">
                </form>
            </div>
           `
        }
    }

})