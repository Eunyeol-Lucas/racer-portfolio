from flask import jsonify, Blueprint, request, abort
from werkzeug.utils import secure_filename
from models import Profile, User
from db_connect import db
from flask_jwt_extended import *
import random
import io
import base64
from PIL import Image

# 프로필
bp = Blueprint('profile', __name__)

def get_encoded_img(image_path):
    img = Image.open(image_path, mode='r')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return my_encoded_img

@bp.route('/profile', methods = ['GET', 'POST', 'PATCH'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        
        try:
            user_profile = User.query.filter(User.id == user_id).first()
            user_info = User.to_dict(user_profile)
            return jsonify(user_info)
            
            # user = User.query.filter(User.id == user_id).first()
            # user_name = user.username
            # user_profile_info = {
            #     'profile_image': get_encoded_img(user_profile.profile_image),
            #     'introduction': user_profile.introduction,
            #     'name': user_name
            # }
            # return jsonify(user_profile_info)
        
        except Exception as e:
            db.session.rollback()
            abort(400, {'error': str(e)})

    if request.method == 'POST':
        data = request.files['file']
        if not data:
            abort(404, 'No data')
        file_location = './static/'+ str(random.random())+secure_filename(data.filename)
        data.save(file_location)
        profile = Profile(
            user_id = user_id,
            profile_image = file_location
        )
        db.session.add(profile)
        try:
            db.session.commit()
            return jsonify({"result": "success"})
            
        except Exception as e:
            db.session.rollback()
            abort(401, {'error': str(e)})


    if request.method == 'PATCH':
        user_profile = User.query.filter(User.id == user_id).first()
        
        if request.files['file']:
            data = request.files['file']
            if not data:
                abort(404, 'No data')
            file_location = './static/'+ str(random.random())+secure_filename(data.filename)
            data.save(file_location)
            

            user_profile.profile_image = file_location
        
            try:           
                db.session.commit()
                return jsonify({'result': 'success'})

            except Exception as e:
                db.session.rollback()
                abort(400, {'error': str(e)})


