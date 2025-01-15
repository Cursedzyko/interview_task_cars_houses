from fastapi import APIRouter, Depends, HTTPException
from utils.auth import get_current_user
from utils.database import Database
from typing import List
from pydantic import BaseModel


admin_router = APIRouter()

@admin_router.get("/admin-only/")
async def admin_only(current_user: str = Depends(get_current_user)):
    user_collection = Database.db["users"]
    db_user = await user_collection.find_one({"username": current_user})
    
    if not db_user or "Admin" not in db_user.get("roles", []):
        raise HTTPException(status_code=403, detail="You do not have permission to access this resource")
    return {"message" : f"Welcome to the Admin section, {current_user}"}

@admin_router.delete("/delete_user/")
async def delete_user(username: str, current_user: str = Depends(get_current_user)):
    user_collection = Database.db["users"]
    admin_user = await user_collection.find_one({"username": current_user})
    if not admin_user or "Admin" not in admin_user.get("roles", []):
        raise HTTPException(status_code=403, detail="Only admins can delete users")
    
    result = await user_collection.delete_one({"username": username})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": f"User {username} deleted successfully."}



class UpdatePermissionsRequest(BaseModel):
    username: str
    permissions: List[str]

@admin_router.put("/update_permissions/")
async def update_permissions(
    request: UpdatePermissionsRequest,
    current_user: str = Depends(get_current_user)
):
    user_collection = Database.db["users"]
    db_user = await user_collection.find_one({"username": current_user})
    
    if not db_user or "Admin" not in db_user.get("roles", []):
        raise HTTPException(status_code=403, detail="Permission denied: Only Admins allowed to update permissions")
    
    target_user = await user_collection.find_one({"username": request.username})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_permissions = set(target_user.get("permissions", []))
    updated_permissions = current_permissions.union(request.permissions)
    
    result = await user_collection.update_one(
        {"username": request.username},
        {"$set": {"permissions": list(updated_permissions)}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Permissions unchanged")
    
    return {"message": "Permissions updated successfully"}



@admin_router.get("/list_users/")
async def list_users(current_user: str = Depends(get_current_user)):
    user_collection = Database.db["users"]
    admin_user = await user_collection.find_one({"username": current_user})
    
    if not admin_user or "Admin" not in admin_user.get("roles", []):
        raise HTTPException(status_code=403, detail="Only admins can view users")
    
    users = await user_collection.find({}, {"_id": 0, "password": 0}).to_list(length=100)
    return users

class UpdateRolesRequest(BaseModel):
    username: str
    roles: List[str]

@admin_router.put("/update_roles/")
async def update_roles(
    request: UpdateRolesRequest,
    current_user: str = Depends(get_current_user)
):
    allowed_roles = {"Admin", "RegularUser"}

    if not set(request.roles).issubset(allowed_roles):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid roles provided. Allowed roles are: {', '.join(allowed_roles)}"
        )

    user_collection = Database.db["users"]
    db_user = await user_collection.find_one({"username": current_user})

    if not db_user or "Admin" not in db_user.get("roles", []):
        raise HTTPException(status_code=403, detail="Permission denied: Only Admins allowed to update roles")
    
    target_user = await user_collection.find_one({"username": request.username})
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    result = await user_collection.update_one(
        {"username": request.username},
        {"$set": {"roles": request.roles}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="Roles unchanged")
    
    return {"message": "Roles updated successfully"}
