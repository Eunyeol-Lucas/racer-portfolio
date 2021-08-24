from flask import request, jsonify, Blueprint, abort
from models import Award
from db_connect import db
from flask_jwt_extended import *

bp=Blueprint('award', __name__)

@bp.route('/award', methods = ['GET', 'POST', 'PATCH', 'DELETE'])
@jwt_required()
def awards():
    user_id = get_jwt_identity()
    # 메인 페이지에 접속할 경우 Award table에 저장된 학령사항 정보 요청
    if request.method == 'GET':
        try:
            user_awards = Award.query.filter(Award.user_id == user_id).all()
            Award.to_dict()
            awards_list = [
                Award.to_dict(award) for award in user_awards
            ]
            return jsonify(awards_list)

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
    # 1개 이상의 awards 정보 data를 Award db에 저장 요청
    if request.method == 'POST':
        
        data = request.json
        for list in data['awards_list']:
            name = list['name']
            description = list['description']

            award_list = Award(
                user_id = user_id,
                name = name,
                description =  description
            )
            db.session.add(award_list)
        try:
            db.session.commit()
            return jsonify({'result': 'success'})

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})

    # Award 데이터 수정 요청
    if request.method == 'PATCH':
        data = request.json
        for list in data['awards_list']:
            award_id = list['id']
            name = list['name']
            description = list['description']

            user_award = Award.query.filter(Award.id == award_id).first()
            user_award.name = name
            user_award.description = description
        try:    
            db.session.commit()
            return jsonify({'result': 'success'})

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})

    # Award data 삭제 요청
    if request.method == 'DELETE':
        data = request.json
    
        award_id = data['id']
        user_award = Award.query.filter(Award.id == award_id).first()
        db.session.delete(user_award)
        try:
            db.session.commit()
            return jsonify()
        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
