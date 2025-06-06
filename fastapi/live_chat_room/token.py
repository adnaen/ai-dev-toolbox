from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt


SECRET_KEY: str = "ybUR6k3egAfGlOt9VbYOx-qG4m6KEPeb7N5AWmWCl2E"
ACCESS_TOKEN_EXPIRE_MINUTES: int = 10
ALGORITHM: str = "HS256"

pass_hash = CryptContext(schemes=["bcrypt"])


def hash_passwd(passwd: str) -> str:
    return pass_hash.hash(passwd)


def verifiy_passwd(passwd: str, hash: str) -> bool:
    return pass_hash.verify(secret=passwd, hash=hash)


def gen_access_token(data: dict) -> str:
    expire_in = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire_in})
    return jwt.encode(claims=data, algorithm=ALGORITHM, key=SECRET_KEY)


def decode_access_token(token: str) -> str:
    return jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])["sub"]
