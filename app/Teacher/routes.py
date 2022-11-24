from flask import Blueprint, render_template, request, redirect, json, jsonify, make_response,flash
import csv,os
import app.extensions

teacher = Blueprint('teacher', __name__, url_prefix='/teacher')
teacher_collection = app.extensions.teacher_collection
score_collection = app.extensions.exam_collection
msg = ""


@teacher.route('/login')
def teacher_intro():
    msg = 'Please enter your credentials'
    return render_template('Teacher.html', msg=msg)


@teacher.route('/menu', methods=['GET', 'POST'])
def teacher_login():
    msg = "Enter your credentials!"
    if (request.method == 'POST'):
        teacherName = request.form["teacherName"]
        print(request.form["teacherName"])
        pwd = request.form["pwd"]
        if (teacher_collection.find_one({'teacher_name': {"$eq": teacherName}, 'password': {"$eq": pwd}})):
            return render_template('Menu.html', teacherName=teacherName)
        else:
            msg = 'Incorrect credentials'
    return redirect('/teacher/login', msg=msg)


@teacher.route('/question_settings')
def question_set():
    return render_template("Questionnaire.html")


@teacher.route('/question_settings/questions', methods=['POST'])
def question():
    req = request.get_json()
    res = make_response(jsonify({"message": "JSON received"}))
    with open('Data/question.json', 'r+') as f:
        # json.write(req, f)
        # First we load existing data into a dict.
        file_data = json.load(f)
        # Join new_data with file_data inside questions
        file_data["Question_settings"] = req
        # Sets file's current position at offset.
        f.seek(0)
        # convert back to json.
        json.dump(file_data, f, indent=4)
    return res


@teacher.route('/question_settings/question', methods=['POST'])
def question1():
    req = request.get_json()
    res = make_response(jsonify({"message": "JSON received"}))
    with open('Data/question.json', 'r+') as f:
        # json.write(req, f)
        # First we load existing data into a dict.
        file_data = json.load(f)
        # Join new_data with file_data inside questions
        file_data["quizData"].append(req)
        # Sets file's current position at offset.
        f.seek(0)
        # convert back to json.
        json.dump(file_data, f, indent=4)
    return res


@teacher.route('/score_list', methods=['GET', 'POST'])
def scores():
    scores = score_collection.find()
    return render_template("Scores.html", scores=scores)


@teacher.route('/score_save', methods=['GET', 'POST'])
def score_save():
    score_cursor = score_collection.find()
    x = list(score_cursor)
    keys = ['_id','studentName','rollNo','studentScore','completionTime','qScore']
    with open('Data/scores.csv', 'w', newline='') as score_file:
        dict_writer = csv.DictWriter(score_file, fieldnames=keys)
        dict_writer.writeheader()
        for i in x:
            dict_writer.writerow(i)
    return '''<h1>Success!</h1>'''

@teacher.route('/question_settings/question_upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        f.save('temp_ques.json')
        with open('temp_ques.json','r+') as file:
            x = json.load(file)
            print(type(x))
            print(x)

        with open('Data/question.json','r+') as file:
            file_data = json.load(file)
            for i in x['quizData']:
                file_data['quizData'].append(i)
            file.seek(0)
            json.dump(file_data,file,indent = 4)
        os.remove('temp_ques.json')
        return '''Success!'''