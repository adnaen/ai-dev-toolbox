from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///./database.db")
Base = declarative_base()
Session = sessionmaker(bind=engine)


def get_session():
    session = Session()
    try:
        yield session

    finally:
        session.close()
