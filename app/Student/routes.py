from json import JSONEncoder
from flask import Blueprint,render_template,request,redirect,jsonify,make_response,json,url_for,send_from_directory
import requests
import flask
import app.extensions

folder = 'E:\Quiz Page'

student = Blueprint('student', __name__,url_prefix='/student')
student_collection = app.extensions.student_collection
exam_collection = app.extensions.exam_collection

userList = {}

@student.route('/login')
def student_intro():
    msg="Enter your credentials"
    return render_template('Student.html', msg=msg)

@student.route('/rule', methods=['GET','POST'])
def login():
    msg="Enter your credentials!"
    ip_addr = flask.request.remote_addr
    print('IP Address:',ip_addr)
    if(request.method == 'POST'):
        print(request.form["studentName"], request.form["rollNo"])
        studentName = request.form["studentName"]
        rollNo = request.form["rollNo"]
        pwd = request.form["pwd"]
        if(student_collection.find_one({'Student Name': {"$eq": studentName}, 'Student Roll':{"$eq": rollNo}, 'Password':{"$eq": pwd}})) :
            userList[ip_addr] = rollNo
            entry = {}
            entry['studentName'] = studentName
            entry['rollNo'] = rollNo
            entry['studentScore'] = 0
            entry['completionTime'] = 0
            exam_collection.insert_one(entry)
            print(entry)
            msg="Hello"
            return render_template('Rules.html', studentName=studentName)
        else:
            msg = 'Incorrect credentials'
    return redirect("/student/login")

@student.route('/quiz', methods=['POST','GET'])
def question():
    # if(request.method == 'GET' and 'Content-Type' == 'application/json'):
    #     req = request.get_json()
    #     print(req)
    #     res = make_response(jsonify({"message": "JSON received"}))
    # with open('question.json', 'r') as f:
    #     x = json.load(f)
    #     y = json.dumps(x)
    #     print(y)
    #     # print(x['quizData'])
    return render_template('Quiz.html')

@student.route('/quiz/question')
def questionset():
    return send_from_directory(folder,path='question.json',as_attachment=True)

@student.route('/end', methods=['GET','POST'])
def end():
    ip_dummy = flask.request.remote_addr
    print(userList[ip_dummy])
    if(request.method == 'POST'):
        studentScore = request.form['studentScore']
        studentTime = request.form['studentTime']
        exam_collection.update_one({'rollNo': userList[ip_dummy]}, { '$set': {'studentScore': studentScore}})
        exam_collection.update_one({'rollNo': userList[ip_dummy]}, { '$set': {'completionTime': studentTime}})
        print(studentScore,studentTime)
    return render_template('End.html')




