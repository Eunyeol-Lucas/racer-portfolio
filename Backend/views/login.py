from flask import request, jsonify, Blueprint, abort
from models import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import *

bp = Blueprint('login', __name__)

bcrypt = Bcrypt()

# 로그인
@bp.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        
        userid = data['userId']
        password = data['password']
        user = User.query.filter(User.userid == userid).first()
        if user is not None:
            user_id = user.id
            if bcrypt.check_password_hash(user.password, password):
                try:
                    access_token = create_access_token(identity = user_id, fresh=True)
                    refresh_token = create_refresh_token(identity = user_id)
                    return jsonify(
                        result='success',
                        access_token = access_token,
                        refresh_token = refresh_token
                        )
                except Exception as e:
                    abort(400,'예기치 못한 문제가 발생하였습니다.')
            else:
                abort(400,'비밀번호가 일치하지 않습니다.')
        else:
            abort(400, "유저가 아닙니다.")
    else:
        abort(400, "요청에 실패하셨습니다.")

@bp.route('/refresh', methods = ['POST'])
@jwt_required(refresh = True)
def refresh():
    access_token = create_access_token(identity = get_jwt_identity(), fresh = False)
    return jsonify(access_token =access_token)