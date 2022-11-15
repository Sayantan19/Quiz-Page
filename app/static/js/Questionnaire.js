const button = document.getElementById('nextbut')
const info_set = document.getElementById('info')
const questiontime = document.getElementById('time_for_each_question')
const quizquestion = document.getElementById('no_of_questions_in_quiz')
button.addEventListener('click', openQues)
let i = 0;

function openQues() {
    const data = {
        questiontime: questiontime.value,
        quizquestions: quizquestion.value
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
    callQuestionPage()
}

function callQuestionPage() {
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
                <button class="btn btn-outline-dark forms" id="next">Add Question</button>
                <button class="btn btn-outline-dark forms" id="end">Exit</button>
                `
    var question = document.getElementById('question');
    var option1 = document.getElementById('option1');
    var option2 = document.getElementById('option2');
    var option3 = document.getElementById('option3');
    var option4 = document.getElementById('option4');
    var answer = document.getElementById('answer');
    const button1 = document.getElementById('next')
    const button2 = document.getElementById('end')
    button1.addEventListener('click', openQues1)
    button2.addEventListener('click', callEndPage)
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
    if(data1['question'] == "" || data1['a'] == "" || data1['b'] == "" || data1['c'] == "" || data1['d'] == "" || data1['answer'] == "")
        alert('One or more fields are empty. Please fill form carefully.')
    else
    {
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
}

function callEndPage() {
    const data1 = {
        'question': question.value,
        'a': option1.value,
        'b': option2.value,
        'c': option3.value,
        'd': option4.value,
        'answer': answer.value
    }
    if(data1['question'] == "" || data1['a'] == "" || data1['b'] == "" || data1['c'] == "" || data1['d'] == ""|| data1['answer'] == "")
        alert('One or more fields are empty. Please fill form carefully.')
    else if(data1['question'] == "" && data1['a'] == "" && data1['b'] == "" && data1['c'] == "" && data1['d'] == "" || data1['answer'] == "")
    {
        info.innerHTML = `
        <div class="container" id="end">
            <p id="exitMessage"><h2>Questions successfully entered!</h2></p>
            <button class="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Go to menu</button>
        </div>
        `
    }
    else
    {
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
        info.innerHTML = `
        <div class="container" id="end">
            <p id="exitMessage"><h2>Questions successfully entered!</h2></p>
            <button class="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Go to menu</button>
        </div>
        `
    }
}