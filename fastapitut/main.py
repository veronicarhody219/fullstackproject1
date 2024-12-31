from fastapi import FastAPI, HTTPException
from datetime import datetime
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()
tasks = {}


class Task(BaseModel):
    id: str = None
    title: str
    description: str
    completed: bool


@app.get("/tasks", response_model=List[Task])
def get_task():
    return list(tasks.values())


@app.post("/tasks", response_model=Task)
def create_task(task: Task):

    task_id = str(uuid.uuid4())
    task_data = task.model_dump()
    task_data['id'] = task_id
    tasks[task_id] = task_data
    return task_data


@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task: Task):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    task_data = task.model_dump()
    task_data['id'] = task_id
    tasks[task_id] = task_data
    return task_data


@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    deleted_task = tasks.pop(task_id)
    return {"message": "Task deleted successfully", "task": deleted_task}


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI"}


@app.get("/hello")
def say_hello(name: str = "World"):
    return {"message": f"Hello {name}!"}


@app.get("/count")
def count_name(name: str = "world"):
    current_time = datetime.now().strftime("%d-%m-%Y %H:%M:%s")
    return {"message": f"{name} has {len(name)} characters",
            "servertime": current_time}
