import app.extensions
student_collection = app.extensions.student_collection

cursor = student_collection.find_one({'Student Roll': {"$eq": '2060090'}})['Student Name']

print(cursor)