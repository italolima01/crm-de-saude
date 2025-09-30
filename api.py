import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import init_db, get_session, Appointment, Patient, Dentist, Service
from datetime import datetime, time

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)

engine = None

def get_db_engine():
    global engine
    if engine is None:
        engine = init_db()
    return engine

@app.route('/')
def index():
    return "API is running"

@app.route('/api/appointments', methods=['GET', 'POST'])
def handle_appointments():
    if request.method == 'GET':
        try:
            db_engine = get_db_engine()
            session = get_session(db_engine)
            appointments = session.query(Appointment).all()
            
            appointments_data = []
            for app in appointments:
                appointments_data.append({
                    'id': app.id,
                    'patient': app.patient.name if app.patient else None,
                    'date': app.date.isoformat() if app.date else None,
                    'time': app.time.isoformat() if app.time else None,
                    'status': app.status,
                    'doctor': app.dentist.name if app.dentist else None,
                    'service': app.service.name if app.service else None,
                })
            
            session.close()
            return jsonify(appointments_data)
        except Exception as e:
            logging.error(f"Error fetching appointments: {e}", exc_info=True)
            return jsonify({"error": "Failed to fetch appointments"}), 500
    elif request.method == 'POST':
        try:
            data = request.json
            db_engine = get_db_engine()
            session = get_session(db_engine)
            
            date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
            time_obj = datetime.strptime(data['time'], '%H:%M').time()

            new_appointment = Appointment(
                patient_id=data['patient_id'],
                dentist_id=data['dentist_id'],
                service_id=data['service_id'],
                date=date_obj,
                time=time_obj,
                status=data.get('status', 'Pendente')
            )
            
            session.add(new_appointment)
            session.commit()
            
            appointment_id = new_appointment.id
            session.close()
            
            return jsonify({"message": "Appointment created successfully", "id": appointment_id}), 201
        except Exception as e:
            logging.error(f"Error creating appointment: {e}", exc_info=True)
            return jsonify({"error": "Failed to create appointment"}), 500

@app.route('/api/patients', methods=['GET', 'POST'])
def handle_patients():
    if request.method == 'GET':
        try:
            db_engine = get_db_engine()
            session = get_session(db_engine)
            patients = session.query(Patient).all()
            
            patients_data = []
            for p in patients:
                patients_data.append({
                    'id': p.id,
                    'name': p.name,
                    'email': p.email,
                    'phone': p.phone
                })
            
            session.close()
            return jsonify(patients_data)
        except Exception as e:
            logging.error(f"Error fetching patients: {e}", exc_info=True)
            return jsonify({"error": "Failed to fetch patients"}), 500
    elif request.method == 'POST':
        try:
            logging.info(f"Received POST request to /api/patients with data: {request.data}")
            data = request.json
            logging.info(f"Request JSON parsed successfully: {data}")
            db_engine = get_db_engine()
            session = get_session(db_engine)

            # Check if patient with this email already exists
            existing_patient = session.query(Patient).filter_by(email=data['email']).first()
            if existing_patient:
                return jsonify({"error": "A patient with this email already exists."}), 409
            
            new_patient = Patient(
                name=data['name'],
                email=data['email'],
                phone=data['phone']
            )
            
            session.add(new_patient)
            session.commit()
            
            patient_id = new_patient.id
            
            created_patient = session.query(Patient).get(patient_id)
            
            session.close()
            
            response_data = {
                'id': created_patient.id,
                'name': created_patient.name,
                'email': created_patient.email,
                'phone': created_patient.phone
            }
            logging.info(f"Successfully created patient. Returning: {response_data}")
            return jsonify(response_data), 201
        except Exception as e:
            logging.error(f"Error creating patient: {e}", exc_info=True)
            return jsonify({"error": "Failed to create patient"}), 500

@app.route('/api/dentists', methods=['GET'])
def get_dentists():
    try:
        db_engine = get_db_engine()
        session = get_session(db_engine)
        dentists = session.query(Dentist).all()
        
        dentists_data = []
        for d in dentists:
            dentists_data.append({
                'id': d.id,
                'name': d.name,
                'specialty': d.specialty
            })
        
        session.close()
        return jsonify(dentists_data)
    except Exception as e:
        logging.error(f"Error fetching dentists: {e}", exc_info=True)
        return jsonify({"error": "Failed to fetch dentists"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)