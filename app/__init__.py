from flask import Flask
from app.Student.routes import student
from app.Teacher.routes import teacher
from app.Profile.routes import quiz_profile
import os

def create_app():
    tempdir = os.path.abspath("e:/Quiz Page/app/html")
    app = Flask(__name__, template_folder=tempdir)
    app.register_blueprint(quiz_profile)
    app.register_blueprint(teacher)
    app.register_blueprint(student)
    return app

