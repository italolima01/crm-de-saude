from database import init_db, get_session
from database import Patient, Dentist, Service, Appointment
from datetime import date, time

def seed_data():
    engine = init_db()
    session = get_session(engine)

    # Clear existing data
    session.query(Appointment).delete()
    session.query(Patient).delete()
    session.query(Dentist).delete()
    session.query(Service).delete()

    # Create Dentists
    dr_joao = Dentist(name='Dr. João Silva', specialty='Clínico Geral')
    dr_carlos = Dentist(name='Dr. Carlos Dentista', specialty='Ortodontia')
    session.add_all([dr_joao, dr_carlos])
    session.commit()

    # Create Patients
    maria = Patient(name='Maria Silva', email='maria.silva@example.com', phone='11999998888')
    joao = Patient(name='João Santos', email='joao.santos@example.com', phone='11988887777')
    ana = Patient(name='Ana Costa', email='ana.costa@example.com', phone='11977776666')
    pedro = Patient(name='Pedro Lima', email='pedro.lima@example.com', phone='11966665555')
    session.add_all([maria, joao, ana, pedro])
    session.commit()

    # Create Services
    consulta = Service(name='Consulta', description='Consulta de rotina', price=100.0)
    retorno = Service(name='Retorno', description='Retorno para acompanhamento', price=50.0)
    limpeza = Service(name='Limpeza', description='Limpeza e profilaxia', price=150.0)
    primeira_consulta = Service(name='Primeira consulta', description='Primeira avaliação do paciente', price=120.0)
    session.add_all([consulta, retorno, limpeza, primeira_consulta])
    session.commit()

    # Create Appointments
    app1 = Appointment(patient=maria, dentist=dr_joao, service=consulta, date=date(2025, 9, 22), time=time(9, 0), status='Confirmado')
    app2 = Appointment(patient=joao, dentist=dr_joao, service=retorno, date=date(2025, 9, 22), time=time(10, 30), status='Em andamento')
    app3 = Appointment(patient=ana, dentist=dr_carlos, service=primeira_consulta, date=date(2025, 9, 22), time=time(14, 0), status='Aguardando')
    app4 = Appointment(patient=pedro, dentist=dr_carlos, service=consulta, date=date(2025, 9, 22), time=time(15, 30), status='Confirmado')
    session.add_all([app1, app2, app3, app4])
    session.commit()

    print("Banco de dados populado com dados de teste!")

if __name__ == '__main__':
    seed_data()
