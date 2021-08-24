from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from models import *

bp = Blueprint('register', __name__)
bcrypt = Bcrypt()

# 회원가입 
@bp.route('/register', methods=['POST'])
def register():
    data = request.json

    register_id = data['id']
    user_info = User.query.filter(User.userid == register_id).first()
    if user_info:
        return jsonify({'result': 'fail'})
    password = data['password']
    username = data['username']
    pw_hash = bcrypt.generate_password_hash(password).decode()
    
    
    user = User(username = username, userid=register_id, password=pw_hash)
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify({'result': 'success'})

    except Exception as e:
        db.session.rollback()
        abort(400,{'error': 'str(e)'} )