const button = document.getElementById('nextbut')
const info_set = document.getElementById('info')
const poolquestion = document.getElementById('no_of_questions_in_pool')
const quizquestion = document.getElementById('no_of_questions_in_quiz')
button.addEventListener('click', openQues)
let i = 0;

function openQues() {
    const data = {
        quizquestions: quizquestion.value,
        poolquestions: poolquestion.value
    }
    console.log(data);
    fetch(`${window.origin}/teacher/question_settings/questions`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': 'application/json'
        })
    }).then(function (response) {
        if (response.status != 200) {
            console.log('Error', response.status);
            return;
        }

        response.json().then(function (data) {
            console.log(data);
        })
    })
    console.log(i)
    callQuestionPage(i)
}

function callQuestionPage(i) {
    if (i == poolquestion.value)
        callEndPage();
    info_set.innerHTML = `
    <div class="forms">
    <label for="question" class="form-label">
    <h3><b>Question: <span id="req">*Required</span></b></h3>
    </label>
    <input type="text" class="form-control" id="question" name="question" placeholder="" required="true">
    </div>
    <div class="forms">
    <label for="option1" class="form-label">
                <h3><b>Option 1: <span id="req">*Required</span></b></h3>
            </label>
            <input type="text" class="form-control" id="option1" name="option1" placeholder="" required="true">
        </div>
        <div class="forms">
                <label for="option2" class="form-label">
                <h3><b>Option 2: <span id="req">*Required</span></b></h3>
                </label>
                <input type="text" class="form-control" id="option2" name="option2" placeholder="" required="true">
                </div>
                <div class="forms">
                <label for="option3" class="form-label">
                <h3><b>Option 3: <span id="req">*Required</span></b></h3>
                </label>
                <input type="text" class="form-control" id="option3" name="option3" placeholder=""required="true">
                </div>
                <div class="forms">
                <label for="option4" class="form-label">
                <h3><b>Option 4: <span id="req">*Required</span></b></h3>
                </label>
                <input type="text" class="form-control" id="option4" name="option4" placeholder=""required="true">
                </div>
                <div class="forms">
                <label for="answer" class="form-label">
                <h3><b>Answer: <span id="req">*Required</span></b></h3>
                </label>
                <input type="text" class="form-control" id="answer" name="answer" placeholder=""required="true">
                </div>
                <hr>
                <button class="btn btn-outline-dark forms" id="next">Next</button>
                `
    var question = document.getElementById('question');
    var option1 = document.getElementById('option1');
    var option2 = document.getElementById('option2');
    var option3 = document.getElementById('option3');
    var option4 = document.getElementById('option4');
    var answer = document.getElementById('answer');
    const button1 = document.getElementById('next')
    button1.addEventListener('click', openQues1)
    console.log(i)
    callQuestionPage(i+1);
}

function openQues1() {
    const data1 = {
        'question': question.value,
        'a': option1.value,
        'b': option2.value,
        'c': option3.value,
        'd': option4.value,
        'answer': answer.value
    }
    console.log(data1);
    fetch(`${window.origin}/teacher/question_settings/question`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data1),
        cache: 'no-cache',
        headers: new Headers({
            'content-type': 'application/json'
        })
    }).then(function (response) {
        if (response.status != 200) {
            console.log('Error', response.status);
            return;
        }

        response.json().then(function (data) {
            console.log(data);
        })
    })
    question.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    answer.value = "";
}

function callEndPage() {
    info.innerHTML = `
    <div class="container" id="end">
        <p id="exitMessage"><h2>Thanks for taking part in this quiz. We will be notifying you the results soon!</h2></p>
        <button class="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Logout</button>
    </div>
    `
}