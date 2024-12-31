from pydantic import BaseModel

# Dinh nghia Pydantic cho du lieu vao/ra


class UserBase(BaseModel):
    name: str
    email: str
    is_active: bool = True


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
