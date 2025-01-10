from fastapi import APIRouter, Depends, HTTPException
from utils.auth import get_current_user
from utils.database import Database

admin_router = APIRouter()

@admin_router.get("/admin-only/")
async def admin_only(current_user: str =Depends(get_current_user)):
    user_collection = Database.db["users"]
    db_user = await user_collection.find_one({"username": current_user})
    
    if not db_user or "Admin" not in db_user.get("roles", []):
        raise HTTPException(status_code=403, detail="You do not have permission to access this resource")
    return {"message" : f"Welcome to the Admin section, {current_user}"}
