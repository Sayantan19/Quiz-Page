# from email.policy import default
from tempfile import tempdir
import os
from flask_sqlalchemy import SQLAlchemy
import flask
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from flask import Flask, render_template, request,session

tempdir = os.path.abspath("e:/Quiz Page/html")
app = Flask(__name__, template_folder=tempdir)
app.secret_key = 'your secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///Details.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'valoboi@1932'
app.config['MYSQL_DB'] = 'student'
db1 = MySQL(app)
db = SQLAlchemy(app)
userList = {}

class Details(db.Model):
    no = db.Column(db.Integer, primary_key=True)
    studentName = db.Column(db.String(200), nullable=False)
    rollNo = db.Column(db.String(10), nullable=False)
    studentScore = db.Column(db.String(10), default="0")
    studentTime = db.Column(db.String(10), default="0")

    def __repr__(self) -> str:
        return f"{self.no} - {self.rollNo}"



@app.route('/')
def intro():
    return render_template('Welcome.html')

@app.route('/rule', methods=['GET','POST'])
def rules():
    ip_addr = flask.request.remote_addr
    print('IP Address:',ip_addr)
    if(request.method == 'POST'):
        print(request.form["studentName"], request.form["rollNo"])
        studentName = request.form["studentName"]
        rollNo = request.form["rollNo"]
        cursor = db1.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM student.student_db WHERE `Student Name` = % s AND `Student Roll` = % s', (studentName, rollNo, ))
        account = cursor.fetchone()
        if account:
            userList[ip_addr] = rollNo
            details = Details(studentName=studentName, rollNo=rollNo,studentScore="0",studentTime="0")
            db.session.add(details)
            db.session.commit()
            msg = 'Welcome to the quiz portal'
            return render_template('Rules.html',msg=msg)
        else:
            msg = 'Incorrect credentials!'
    return render_template('Welcome.html',msg=msg)

@app.route('/quiz')
def quiz():
    return render_template('Quiz.html')

@app.route('/end', methods=['GET','POST'])
def end():
    ip_dummy = flask.request.remote_addr
    print(userList[ip_dummy])
    score_to_update = Details.query.filter_by(rollNo=userList[ip_dummy]).first()
    if(request.method== 'POST'):
        score_to_update.studentScore = request.form['studentScore']
        score_to_update.studentTime = request.form['studentTime']
        print(score_to_update.studentScore)
        print(score_to_update.studentTime)
        db.session.commit()
    return render_template('End.html')

if(__name__ == '__main__'):
    app.run(debug=True, port= 15000, host="0.0.0.0")