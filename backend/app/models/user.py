from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    roles: list[str] = []
    permissions: list[str] = []