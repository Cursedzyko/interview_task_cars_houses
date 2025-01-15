from fastapi import APIRouter, HTTPException
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from jose import jwt
from models.user import User
from utils.database import Database
from utils.password_utils import verify_password



login_router = APIRouter()


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")


def create_access_token(data: dict, expires_delta: timedelta = timedelta(int(ACCESS_TOKEN_EXPIRE_MINUTES))):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@login_router.post("/login/")
async def login(user: User):
    user_collection = Database.db["users"]
    
    db_user = await user_collection.find_one({"username": user.username})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    roles = db_user.get("roles")
    if "Admin" in roles:
        role = "Admin"
    else:
        role = "RegularUser"

    access_token = create_access_token(data={"sub": user.username, "role": role})
    
    return {"access_token": access_token, "token_type": "bearer", "role": role}
