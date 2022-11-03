from flask import Blueprint,render_template,request,redirect,json,jsonify,make_response
import app.extensions

teacher = Blueprint('teacher', __name__,url_prefix='/teacher')
teacher_collection = app.extensions.teacher_collection
user = ""

@teacher.route('/login')
def teacher_intro():
    msg = 'Please enter your credentials'
    return render_template('Teacher.html',msg=msg)

@teacher.route('/menu', methods=['GET','POST'])
def teacher_login():
    msg="Enter your credentials!"
    if(request.method == 'POST'):
        teacherName = request.form["teacherName"]
        # user = teacherName
        print(request.form["teacherName"])
        pwd = request.form["pwd"]
        if(teacher_collection.find_one({'teacher_name':{"$eq": teacherName},'password': {"$eq": pwd}})):
            return render_template('Menu.html',teacherName=teacherName)
        else:
            msg = 'Incorrect credentials'
    return redirect('/teacher/login',msg=msg)

@teacher.route('/question_settings')
def question_set():
    return render_template("Questionnaire.html")

@teacher.route('/question_settings/questions', methods=['POST'])
def question():
    req = request.get_json()
    print(req)
    res = make_response(jsonify({"message": "JSON received"}))
    with open('question.json', 'r+') as f:
        # json.write(req, f)
        # First we load existing data into a dict.
        file_data = json.load(f)
        # Join new_data with file_data inside questions
        file_data["Question_settings"] = req
        # Sets file's current position at offset.
        f.seek(0)
        # convert back to json.
        json.dump(file_data, f, indent = 4)
    return res

@teacher.route('/question_settings/question', methods=['POST'])
def question1():
    req = request.get_json()
    print(req)
    res = make_response(jsonify({"message": "JSON received"}))
    with open('question.json', 'r+') as f:
        # json.write(req, f)
        # First we load existing data into a dict.
        file_data = json.load(f)
        # Join new_data with file_data inside questions
        file_data["quizData"].append(req)
        # Sets file's current position at offset.
        f.seek(0)
        # convert back to json.
        json.dump(file_data, f, indent = 4)
    return res



