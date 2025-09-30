from database import get_session, init_db, Dentist

def add_dentists():
    engine = init_db()
    session = get_session(engine)

    dentist1 = Dentist(name='Dr. Carlos Ferreira', specialty='Ortodontia')
    dentist2 = Dentist(name='Dra. Ana Souza', specialty='Endodontia')
    dentist3 = Dentist(name='Dr. Marcos Andrade', specialty='Implantodontia')

    session.add_all([dentist1, dentist2, dentist3])
    session.commit()

    print("3 dentists added successfully!")

if __name__ == '__main__':
    add_dentists()