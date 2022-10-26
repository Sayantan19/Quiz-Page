from flask_pymongo import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017")
student_db = client['Student']
student_collection = student_db['student-credentials']
teacher_db = client['Teacher']
exam_collection = teacher_db['student-scores']
teacher_collection = teacher_db['teacher-credentials']