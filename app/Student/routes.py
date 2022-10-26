from flask import Blueprint,render_template,request
import flask
import app.extensions

student = Blueprint('student', __name__,url_prefix='/student')
student_collection = app.extensions.student_collection
exam_collection = app.extensions.exam_collection

userList = {}

@student.route('/login')
def student_intro():
    return render_template('Student.html')

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
            entry['studentScore'] = '0'
            entry['completionTime'] = '0'
            exam_collection.insert_one(entry)
            print(entry)
            msg="Hello"
            return render_template('Rules.html')
        else:
            msg = 'Incorrect credentials'
    return render_template('Student.html',msg=msg)

@student.route('/quiz')
def quiz():
    return render_template('Quiz.html')

@student.route('/end', methods=['GET','POST'])
def end():
    ip_dummy = flask.request.remote_addr
    print(userList[ip_dummy])
    if(request.method == 'POST'):
        studentScore = request.form['studentScore']
        studentTime = request.form['studentTime']
        exam_collection.replace_one({'Student Roll': userList[ip_dummy]}, {'studentScore': studentScore})
        exam_collection.replace_one({'Student Roll': userList[ip_dummy]}, {'studentTime': studentTime})
        print(studentScore,studentTime)
    return render_template('End.html')




