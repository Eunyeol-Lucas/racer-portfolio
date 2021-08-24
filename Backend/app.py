from flask import Flask, request, jsonify
from db_connect import db
from flask_migrate import Migrate
from models import *
from flask_cors import CORS
from flask_jwt_extended import *
import config

def create_app():
    app = Flask(__name__)
    jwt = JWTManager(app)
    CORS(app)
    
    app.config.from_object(config)

    db.init_app(app)
    Migrate().init_app(app, db)

    

    from views import profile, register, login, education, certificates, awards, projects

    app.register_blueprint(profile.bp)
    app.register_blueprint(register.bp)
    app.register_blueprint(login.bp)
    app.register_blueprint(education.bp)
    app.register_blueprint(certificates.bp)
    app.register_blueprint(awards.bp)
    app.register_blueprint(projects.bp)

    return app


if __name__ == '__main__':
    create_app().run('0.0.0.0', 5000, debug=True)