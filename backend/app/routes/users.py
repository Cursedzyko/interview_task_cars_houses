from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from models.user import User
from utils.database import Database

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/create_user/")
async def create_user(user: User):
    users_collection = Database.db["users"]    

    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = hash_password(user.password)

    new_user = user.dict()
    new_user['password'] = hashed_password 
    
    await users_collection.insert_one(new_user)
    
    return {"message": "User created successfully"}