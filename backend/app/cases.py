from typing import Optional, List
import time
import json
from datetime import datetime, UTC

from sqlmodel import Session, select
from pydantic.json import pydantic_encoder

from .database import engine, CaseDB, Status, case_from_db
from .models import Case, Step, Option, Evidence
from .mock import MOCK_STEP, MOCK_SUMMARY


async def create_case() -> Case:
    new_case = CaseDB(
        status=Status.submitted,
        created_at=datetime.now(UTC),
        procedure_name="Facet Joint Injection",
        cpt_codes=["64490", "64491", "64492", "64493", "64494", "64495"],
        is_met=False,
        is_complete=False,
    )
    with Session(engine) as session:
        session.add(new_case)
        session.commit()
        session.refresh(new_case)
    return case_from_db(new_case)


async def get_case(id: str) -> Case:
    with Session(engine) as session:
        case_db = session.get(CaseDB, id)
        return case_from_db(case_db)


async def get_cases() -> List[Case]:
    with Session(engine) as session:
        cases = session.exec(select(Case)).all()
        return [case_from_db(c_db) for c_db in cases]


def update_status(case_id: str):
    with Session(engine) as session:
        case = session.get(CaseDB, case_id)
        case.status = Status.processing
        session.add(case)
        session.commit()


def update_steps(case_id: str):
    with Session(engine) as session:
        case = session.get(CaseDB, case_id)
        case.status = Status.completed
        case.summary = MOCK_SUMMARY.strip()
        case_steps = [
            MOCK_STEP,
        ]
        steps_json = json.dumps(case_steps, default=pydantic_encoder)
        case.steps_json = steps_json
        session.add(case)
        session.commit()
