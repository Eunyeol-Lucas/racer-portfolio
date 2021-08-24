from flask import request, jsonify, Blueprint, abort
from models import Certification
from db_connect import db
from flask_jwt_extended import *

bp = Blueprint('certificate', __name__)
# 자격증 내역
@bp.route('/certified', methods = ['GET','POST', 'PATCH', 'DELETE'])
@jwt_required()
def certification():
    user_id = get_jwt_identity()
    # 메인 페이지에 접속할 경우 Education table에 저장된 학령사항 정보 요청
    if request.method == 'GET':
        try:
            user_certificates = Certification.query.filter(Certification.user_id == user_id).all()

            certificates_list = [
                Certification.to_dict(certificate) for certificate in user_certificates
            ]
            return jsonify(certificates_list)

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
    # 1개 이상의 certificate 정보 data를 Certification db에 저장 요청
    if request.method == 'POST':
        
        data = request.json
        for list in data['certificates_list']:
            name = list['name']
            certified_by = list['certified_by']
            certified_date = list['certified_date']

            certificate_list = Certification(
                user_id = user_id,
                name = name,
                certified_by =  certified_by,
                certified_date = certified_date
            )
            db.session.add(certificate_list)
        try:
            db.session.commit()
            return jsonify({'result': 'success'})

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
    # certification 데이터 수정 요청
    if request.method == 'PATCH':

        data = request.json
        for list in data['certificates_list']:
            certificate_id = list['id']
            name = list['name']
            certified_by = list['certified_by']
            certified_date = list['certified_date']

            user_certificate = Certification.query.filter(Certification.id == certificate_id).first()

            user_certificate.name = name
            user_certificate.certified_by = certified_by
            user_certificate.certified_date = certified_date
        try:   
            db.session.commit()
            return jsonify({'result': 'success'})

        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
    # certification data 삭제 요청
    if request.method == 'DELETE':
        data = request.json
        
        certificate_id = data['id']
        user_certificate = Certification.query.filter(Certification.id == certificate_id).first()

        db.session.delete(user_certificate)
        try:
            db.session.commit()
            return jsonify({'result': 'success'})
        
        except Exception as e:
            db.session.rollback()
            abort(400,{'error': str(e)})
