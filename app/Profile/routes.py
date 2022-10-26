from flask import render_template,Blueprint

quiz_profile = Blueprint('Profile', __name__,url_prefix='/')


@quiz_profile.route('/')
def profile():
    return render_template('Profile.html')