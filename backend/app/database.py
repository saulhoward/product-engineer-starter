from typing import Optional, List
from enum import Enum
from datetime import datetime

from sqlmodel import SQLModel, create_engine, Column, JSON, Field
from pydantic import TypeAdapter

from .models import Status, Case, Step


class CaseDB(SQLModel, table=True):
    case_id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime
    status: Status
    procedure_name: str
    cpt_codes: List[str] = Field(sa_column=Column(JSON))
    summary: Optional[str]
    is_met: bool
    is_complete: bool
    steps_json: Optional[str] = Field(sa_column=Column(JSON))

    # Needed for Column(JSON)
    class Config:
        arbitrary_types_allowed = True


engine = create_engine("sqlite:///database.db", echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def case_from_db(db: CaseDB) -> Case:
    steps = []
    if db.steps_json is not None:
        ta = TypeAdapter(List[Step])
        steps = ta.validate_json(db.steps_json)
    return Case(
        case_id=db.case_id,
        created_at=db.created_at,
        status=db.status,
        procedure_name=db.procedure_name,
        cpt_codes=db.cpt_codes,
        summary=db.summary,
        is_met=db.is_met,
        is_complete=db.is_complete,
        steps=steps,
    )
