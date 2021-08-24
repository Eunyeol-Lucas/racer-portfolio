from flask import request, jsonify, Blueprint, abort
from models import Education
from db_connect import db
from flask_jwt_extended import *

bp = Blueprint('education', __name__)
# 학력 사항
@bp.route('/edu', methods = ['GET', 'POST', 'PATCH', 'DELETE'])
@jwt_required()
def education():
    user_id = get_jwt_identity()
    # 메인페이지에 접속할 경우 저장된 education 정보를 요청
    if request.method == 'GET':
        try:
            user_education = Education.query.filter(Education.user_id == user_id).all()
            education_list = [
                {
                    'id': education.id,
                    'name': education.name,
                    'major': education.major,
                    'status': education.status
                } for education in user_education
            ]
            return jsonify(education_list)
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
    # 1개 이상의 education 정보 data를 Education db에 저장 요청
    if request.method == 'POST':
        data = request.json

        for datum in data['education_list']:
            school = datum['school']
            major = datum['major']
            status = datum['status']
        
            education_list = Education(
                user_id = user_id,
                school = school,
                major = major,
                status = status
            )
            db.session.add(education_list)
        try:
            db.session.commit()
            return jsonify({'result': 'success'})
        
        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
            
    # 데이터 수정 요청
    if request.method == 'PATCH':
        data = request.json
        
        for datum in data['education_list']:
            education_id = datum['id']
            school = datum['school']
            major = datum['major']
            status = datum['status']
            
            user_edu = Education.query.filter(Education.id == education_id).first()
            
            user_edu.school = school
            user_edu.major = major
            user_edu.edu_status = status
        try:   
            db.session.commit()
            return jsonify({'result': 'success'})

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})

    # education data 삭제 요청
    if request.method == 'DELETE':
        data = request.json
        try:
            education_id = data['id']
            user_education = Education.query.filter(Education.id == education_id).first()

            db.session.delete(user_education)
            db.session.commit({'result': 'success'})
            return jsonify()

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})