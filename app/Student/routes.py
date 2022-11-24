from json import JSONEncoder
from flask import Blueprint, render_template, request, redirect, jsonify, make_response, json, url_for, send_from_directory
import requests
import flask
import app.extensions

folder = 'E:\Quiz Page'

student = Blueprint('student', __name__, url_prefix='/student')
student_collection = app.extensions.student_collection
exam_collection = app.extensions.exam_collection

userList = {}


def checkExamComplete(roll):
    if (exam_collection.find_one({'rollNo':{'$eq': roll}})):
        return True
    return False


@student.route('/login')
def student_intro():
    msg = "Enter your credentials"
    return render_template('Student.html', msg=msg)


@student.route('/rule', methods=['GET', 'POST'])
def login():
    print(userList)
    msg = "Enter your credentials!"
    ip_addr = flask.request.remote_addr
    print('IP Address:', ip_addr)
    if (request.method == 'POST'):
        if (checkExamComplete(request.form['rollNo']) != True):
            print(request.form["studentName"], request.form["rollNo"])
            studentName = request.form["studentName"]
            rollNo = request.form["rollNo"]
            pwd = request.form["pwd"]
            if (student_collection.find_one({'Student Name': {"$eq": studentName}, 'Student Roll': {"$eq": rollNo}, 'Password': {"$eq": pwd}})):
                userList[ip_addr] = rollNo
                entry = {}
                entry['studentName'] = studentName
                entry['rollNo'] = rollNo
                exam_collection.insert_one(entry)
                print(entry)
                msg = "Hello"
                return render_template('Rules.html', studentName=studentName)
            else:
                msg = 'Incorrect credentials'
        else:
            msg = 'Exam already taken.'
    return redirect("/student/login")


@student.route('/quiz', methods=['POST', 'GET'])
def question():
    return render_template('Quiz.html')

@student.route('/quiz/question')
def questionset():
    return send_from_directory(folder, path='Data/question.json', as_attachment=True)


@student.route('/quiz_result', methods=['POST'])
def quiz_result():

    req = request.get_json()
    res = make_response(jsonify({"message": "JSON received"}))
    ip_dummy = flask.request.remote_addr
    print(userList[ip_dummy])
    student_collection.find_one({'Student Roll': {"$eq": userList[ip_dummy]}})['Student Name']
    exam_collection.update_one({'rollNo': userList[ip_dummy]}, {
                               '$set': {'studentScore': req['studentScore']}})
    exam_collection.update_one({'rollNo': userList[ip_dummy]}, {
                               '$set': {'completionTime': req['completionTime']}})
    exam_collection.update_one({'rollNo': userList[ip_dummy]}, {
                               '$set': {'qScore': req['qScore']}})
    print(req['studentScore'], req['completionTime'], req['qScore'])
    return res

@student.route('/end')
def end():
    return render_template('End.html')