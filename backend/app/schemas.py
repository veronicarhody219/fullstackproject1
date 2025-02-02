from pydantic import BaseModel
from typing import Optional

# Dinh nghia Pydantic cho du lieu vao/ra


class UserBase(BaseModel):
    name: str
    email: str
    is_active: bool = True


class UserCreate(UserBase):
    name: str
    email: str
    password: str
    is_active: Optional[bool] = True


class UserUpdate(UserBase):
    name: str
    email: str


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: str
    password: str
