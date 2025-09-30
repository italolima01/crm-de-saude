import logging
from sqlalchemy import create_engine, Column, Integer, String, Float, Date, Time, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

logging.basicConfig(level=logging.INFO)

Base = declarative_base()

class Patient(Base):
    __tablename__ = 'patients'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    phone = Column(String)
    appointments = relationship("Appointment", back_populates="patient")

class Dentist(Base):
    __tablename__ = 'dentists'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    specialty = Column(String)
    appointments = relationship("Appointment", back_populates="dentist")

class Service(Base):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float)
    appointments = relationship("Appointment", back_populates="service")

class Appointment(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey('patients.id'))
    dentist_id = Column(Integer, ForeignKey('dentists.id'))
    service_id = Column(Integer, ForeignKey('services.id'))
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    status = Column(String, default='Pendente')
    patient = relationship("Patient", back_populates="appointments")
    dentist = relationship("Dentist", back_populates="appointments")
    service = relationship("Service", back_populates="appointments")

def init_db(db_uri='sqlite:///crm_saude.db'):
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    return engine

def get_session(engine):
    Session = sessionmaker(bind=engine)
    return Session()

if __name__ == '__main__':
    logging.info("Initializing database...")
    init_db()
    logging.info("Database initialized successfully! The file 'crm_saude.db' should be created.")