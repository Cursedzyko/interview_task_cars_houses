from fastapi import FastAPI
from utils.database import connect_to_mongo, close_mongo_connection
from routes.users import router as user_router
from routes.login import login_router
from routes.admin import admin_router
from routes.mock import mock_router
from fastapi.middleware.cors import CORSMiddleware
from utils.database import Database
from utils.password_utils import hash_password
from models.user import User
from routes.mock import add_mock_data
import os
from dotenv import load_dotenv


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
ADMIN= os.getenv("ADMIN")
ADMIN_PASSWORD= os.getenv("ADMIN_PASSWORD")

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    
    user_collection = Database.db["users"]
    existing_admin = await user_collection.find_one({"username": ADMIN})
    
    if not existing_admin:
        hashed_password = hash_password(ADMIN_PASSWORD)
        admin_user = User(
            username=ADMIN,
            password=hashed_password,
            roles=["Admin"],
            permissions=["create", "read", "update", "delete"],
        )
        await user_collection.insert_one(admin_user.dict())
        print("Default admin user created.")
        
    await add_mock_data()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

app.include_router(user_router, tags=["Registration"])

app.include_router(login_router, tags=["Authentication"])

app.include_router(admin_router, tags=["Admin"])

app.include_router(mock_router, tags=["Mock"])

@app.get("/")
async def root():
    return("message: Welcome to the FastAPI backend")