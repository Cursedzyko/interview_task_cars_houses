from fastapi import APIRouter
from utils.database import Database


mock_router = APIRouter()

@mock_router.post("/add_mock_data/")
async def add_mock_data():
    cars_collection = Database.db["cars"]
    house_collection = Database.db["houses"]
    
    cars = [
        {"id": 1, "brand": "Toyota", "model": "Camry", "year": 2020},
        {"id": 2, "brand": "Tesla", "model": "Model 3", "year": 2022},
    ]
    
    houses = [
        {"id": 1, "address": "123 Main St", "price": 350000, "bedrooms": 3},
        {"id": 2, "address": "456 Elm St", "price": 450000, "bedrooms": 4},
    ]
    
    await cars_collection.insert_many(cars)
    await house_collection.insert_many(houses)
    
    return {"message" : "Mock data added successfully"}