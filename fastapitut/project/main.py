# chay ung dung fastAPI
from fastapi import FastAPI, HTTPException, Depends

from models import Product

from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import User
from schemas import UserCreate, UserResponse

# khoi tao du lieu
Base.metadata.create_all(bind=engine)
app = FastAPI()

# Dependency de lay session


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


products = []


@app.post("/products", response_model=Product)
def add_product(product: Product):
    for existing_product in products:
        if existing_product["name"] == product.name:
            raise HTTPException(status_code=400, detail=f"Product '{
                                product.name}' already exits.")
    product_data = product.model_dump()
    products.append(product_data)
    return product_data


@app.get("/products", response_model=list[Product])
def get_product():
    return products
