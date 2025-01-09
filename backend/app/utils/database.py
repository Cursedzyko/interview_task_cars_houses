import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")


class Database:
    client = None
    db = None
    
async def connect_to_mongo():
    Database.client = AsyncIOMotorClient(MONGO_URI)
    Database.db = Database.client[DB_NAME]
    print("Connected to MongoDb")

async def close_mongo_connection():
    if Database.client:
        Database.client.close()
        print("DIsconnected from MONgodb")