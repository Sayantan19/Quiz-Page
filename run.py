import waitress
from app import create_app

app = create_app()

if(__name__ == '__main__'):
    app.run(debug=True, port= 15000, host="0.0.0.0")
    # waitress.serve(app.debug, host='192.168.0.103',port=15000, url_scheme='https')