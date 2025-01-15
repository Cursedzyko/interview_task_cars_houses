from fastapi import APIRouter, Depends, HTTPException
from app.utils.database import Database
from app.utils.auth import get_current_user

mock_router = APIRouter()

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
    
    for car in cars:
        existing_car = await cars_collection.find_one({"brand": car["brand"], "model": car["model"], "year": car["year"]})
        if not existing_car:
            await cars_collection.insert_one(car)
            print(f"Inserted car: {car}")
        else:
            print(f"Car already exists: {car}")
    
    for house in houses:
        existing_house = await house_collection.find_one({"address": house["address"]})
        if not existing_house:
            await house_collection.insert_one(house)
            print(f"Inserted house: {house}")
        else:
            print(f"House already exists: {house}")
    
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