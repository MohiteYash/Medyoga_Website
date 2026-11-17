from datetime import datetime,timedelta,timezone
from jose import jwt,JWTError
from passlib.context import CryptContext
from fastapi import Depends,HTTPException,status
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from .config import settings
from .database import get_db
from .models import User
pwd=CryptContext(schemes=['bcrypt'],deprecated='auto')
bearer=HTTPBearer(auto_error=False)
def hash_password(p:str)->str:return pwd.hash(p)
def verify_password(p:str,h:str)->bool:return pwd.verify(p,h)
def token_for(user:User)->str:
    exp=datetime.now(timezone.utc)+timedelta(minutes=settings.access_token_minutes)
    return jwt.encode({'sub':str(user.id),'exp':exp},settings.jwt_secret,algorithm=settings.jwt_algorithm)
def current_user(creds:HTTPAuthorizationCredentials=Depends(bearer),db:Session=Depends(get_db)):
    if not creds: raise HTTPException(status_code=401,detail='Authentication required')
    try: uid=int(jwt.decode(creds.credentials,settings.jwt_secret,algorithms=[settings.jwt_algorithm])['sub'])
    except (JWTError,ValueError): raise HTTPException(status_code=401,detail='Invalid or expired token')
    user=db.get(User,uid)
    if not user: raise HTTPException(status_code=401,detail='User not found')
    return user
def admin_user(user:User=Depends(current_user)):
    if user.role!='admin': raise HTTPException(status_code=403,detail='Administrator access required')
    return user
