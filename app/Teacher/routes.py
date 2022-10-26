from flask import Blueprint,render_template,request
import app.extensions

teacher = Blueprint('teacher', __name__,url_prefix='/teacher')

teacher_collection = app.extensions.teacher_collection

@teacher.route('/login')
def teacher_intro():
    return render_template('Teacher.html')

@teacher.route('/menu')
def teacher_menu():
    msg="Enter your credentials!"
    if(request.method == 'POST'):
        teacherName = request.form["teacherName"]
        print(request.form["teacherName"])
        pwd = request.form["pwd"]
        if(teacher_collection.find({'teacher_name':{"$eq": teacherName}}) and teacher_collection.find({'password': {"$eq": pwd}})):
            return render_template('Menu.html')
        else:
            msg = 'Incorrect credentials'
    return render_template('Student.html',msg=msg)


