from contextlib import asynccontextmanager
from typing import List
import time

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from .app.database import Case, create_db_and_tables
from .app.cases import (
    create_case,
    get_case,
    get_cases,
    update_steps,
    update_status,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


def run_mock_processing(case_id: str):
    time.sleep(10)
    update_status(case_id)
    time.sleep(20)
    update_steps(case_id)


@app.post("/cases")
async def post_cases(background_tasks: BackgroundTasks) -> Case:
    case = await create_case()
    background_tasks.add_task(run_mock_processing, case.case_id)
    return case


@app.get("/cases/{case_id}")
async def get_case_by_id(case_id: str) -> Case:
    case = await get_case(case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case


@app.get("/cases")
async def get_all_cases() -> List[Case]:
    return await get_cases()
