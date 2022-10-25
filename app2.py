from tempfile import tempdir
import os
import flask
from flask import Flask, render_template, request,sessions
from flask_pymongo import pymongo

tempdir = os.path.abspath("e:/Quiz Page/html")
app = Flask(__name__, template_folder=tempdir)
client = pymongo.MongoClient("mongodb://localhost:27017")
userList = {}
student_db = client['Student']
student_collection = student_db['student-credentials']
teacher_db = client['Teacher']
exam_collection = teacher_db['student-scores']
teacher_collection = teacher_db['teacher-credentials']

@app.route('/')
def intro():
    return render_template('Student.html')

@app.route('/rule', methods=['GET','POST'])
def rules():
    ip_addr = flask.request.remote_addr
    print('IP Address:',ip_addr)
    if(request.method == 'POST'):
        print(request.form["studentName"], request.form["rollNo"])
        studentName = request.form["studentName"]
        rollNo = request.form["rollNo"]
        pwd = request.form["pwd"]
        if(student_collection.find({'Student Name': studentName}) and student_collection.find({'Student Roll': rollNo}) and student_collection.find({'Password': pwd})) :
            userList[ip_addr] = rollNo
            entry = {}
            entry['studentName'] = studentName
            entry['rollNo'] = rollNo
            entry['studentScore'] = '0'
            entry['completionTime'] = '0'
            exam_collection.insert_one(entry)
            print(entry)
            msg = 'Welcome to the Quiz Portal'
            return render_template('Rules.html',msg=msg)
        else:
            msg = 'Incorrect credentials'
            print("not good")
    return render_template('Student.html',msg=msg)
@app.route('/quiz')
def quiz():
    return render_template('Quiz.html')

@app.route('/end', methods=['GET','POST'])
def end():
    ip_dummy = flask.request.remote_addr
    print(userList[ip_dummy])
    if(request.method == 'POST'):
        studentScore = request.form['studentScore']
        exam_collection.replace_one({'Student Roll': userList[ip_dummy]}, {'studentScore': studentScore})
        studentTime = request.form['studentTime']
        exam_collection.replace_one({'Student Roll': userList[ip_dummy]}, {'studentTime': studentTime})
        print(studentScore,studentTime)
    return render_template('End.html')

if(__name__ == '__main__'):
    app.run(debug=True, port= 15000, host="0.0.0.0")