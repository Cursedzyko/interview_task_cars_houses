from motor.motor_asyncio import AsyncIOMotorClient

class Database:
    client = None
    
async def connect_to_mongo():
    Database.client = AsyncIOMotorClient("mongodb://localhost:27017")
    print("Connected to MongoDb")

async def close_mongo_connection():
    if Database.client:
        Database.client.close()
        print("DIsconnected from MongoDB")