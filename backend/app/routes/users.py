from fastapi import APIRouter, HTTPException
from models.user import User
from utils.database import Database
from utils.password_utils import hash_password


router = APIRouter()

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

@router.post("/register/")
async def register_user(user: User):
    users_collection = Database.db["users"]

    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = hash_password(user.password)
    new_user = user.dict()
    new_user["password"] = hashed_password
    new_user["roles"] = ["RegularUser"]
    new_user["permissions"] = [] 

    await users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}