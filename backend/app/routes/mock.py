from fastapi import APIRouter, Depends, HTTPException
from utils.database import Database
from utils.auth import get_current_user

mock_router = APIRouter()

@mock_router.post("/add_mock_data/")
async def add_mock_data():
    cars_collection = Database.db["cars"]
    house_collection = Database.db["houses"]
    
    cars = [
        {"brand": "Toyota", "model": "Camry", "year": 2020},
        {"brand": "Tesla", "model": "Model 3", "year": 2022},
    ]
    
    houses = [
        {"address": "123 Main St", "price": 350000, "bedrooms": 3},
        {"address": "456 Elm St", "price": 450000, "bedrooms": 4},
    ]
    
    await cars_collection.insert_many(cars)
    await house_collection.insert_many(houses)
    
    return {"message" : "Mock data added successfully"}

@mock_router.get("/cars/")
async def get_cars(current_user : str = Depends(get_current_user)):
    user_collection = Database.db["users"]
    
    db_user = await user_collection.find_one({"username": current_user})
    if "view_cars" not in db_user["permissions"] and "Admin" not in db_user["roles"]:
        raise HTTPException(status_code=403, detail="Permission denied: Cannot view cars")
    
    car_collection = Database.db["cars"]
    cars = await car_collection.find({}, {"_id": 0}).to_list(100)
    return {"cars" : cars}


@mock_router.get("/houses/")
async def get_houses(current_user : str = Depends(get_current_user)):
    user_collection = Database.db["users"]
    
    db_user = await user_collection.find_one({"username": current_user})
    if "view_houses" not in db_user["permissions"] and "Admin" not in db_user["roles"]:
        raise HTTPException(status_code=403, detail="Permission denied: Cannot view houses")
    
    house_collection = Database.db["houses"]
    houses = await house_collection.find({}, {"_id": 0}).to_list(100)
    return {"houses" : houses}