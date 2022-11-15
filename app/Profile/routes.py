from flask import render_template,Blueprint
import flask

quiz_profile = Blueprint('Profile', __name__,url_prefix='/')


@quiz_profile.route('/')
def profile():
    client_ip = flask.request.remote_addr
    server_ip = flask.request.host
    return render_template('Profile.html',client=client_ip,server=server_ip)