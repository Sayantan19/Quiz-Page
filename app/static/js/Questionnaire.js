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
    <form action = "/teacher/question_settings/question_upload" method = "post" enctype="multipart/form-data">  
        <input type="file" name="file" id="tag"/>  
        <input type = "submit" value="Upload" id="submit-but">  
    </form>
    `;
    const button2 = document.getElementById('end')
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
    if(data1['question'] == "" || data1['a'] == "" || data1['b'] == "" || data1['c'] == "" || data1['d'] == "" || data1['correct'] == "")
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
        'correct': answer.value
    }
    if(data1['question'] == "" && data1['a'] == "" && data1['b'] == "" && data1['c'] == "" && data1['d'] == "" && data1['correct'] == "")
    {
        info.innerHTML = `
        <div class="container" id="end">
            <p id="exitMessage"><h2>Questions successfully entered!</h2></p>
            <button class="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Go to menu</button>
        </div>
        `
    }
    else if(data1['question'] == "" || data1['a'] == "" || data1['b'] == "" || data1['c'] == "" || data1['d'] == ""|| data1['correct'] == "")
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
        info.innerHTML = `
        <div class="container" id="end">
            <p id="exitMessage"><h2>Questions successfully entered!</h2></p>
            <button class="btn btn-outline-dark" id="endButton" onclick="window.location.assign('/teacher/login')">Go to menu</button>
        </div>
        `
    }
}