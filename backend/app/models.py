from pydantic import BaseModel, Field
from typing import Optional

# Dinh nghia ORM voi SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    # role = Optional[str] = "user"


class Product(BaseModel):
    name: str = Field(..., title="Product name", min_length=1)
    price: float = Field(..., title="Product price", gt=0)  # >0
    quantity: int = Field(default=1, title="Quantity", ge=0)  # >=0
    description: str | None = Field(default=None, title="Product description")
