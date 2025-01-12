from fastapi import FastAPI
from utils.database import connect_to_mongo, close_mongo_connection
from routes.users import router as user_router
from routes.login import login_router
from routes.admin import admin_router
from routes.mock import mock_router


app = FastAPI()


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

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