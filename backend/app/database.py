from typing import Optional, List
from enum import Enum
from datetime import datetime

from sqlmodel import SQLModel, create_engine, Column, JSON, Field
from pydantic import BaseModel


class Status(str, Enum):
    unknown = "unknown"
    submitted = "submitted"
    processing = "processing"
    completed = "completed"


class Option(BaseModel):
    key: str
    text: str
    selected: bool


class Evidence(BaseModel):
    content: str
    page_number: int
    pdf_name: str
    event_datetime: datetime


class Step(BaseModel):
    key: str
    question: str
    options: List[Option]
    reasoning: str
    decision: str
    next_step: str
    is_met: bool
    is_final: bool
    evidence: List[Evidence]


class CaseDB(SQLModel, table=True):
    case_id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime
    status: Status
    procedure_name: str
    cpt_codes: List[str] = Field(sa_column=Column(JSON))
    summary: Optional[str]
    is_met: bool
    is_complete: bool
    steps_json: str = Field(sa_column=Column(JSON))
    steps: Optional[List[Step]] = Field(exclude=True)

    # Needed for Column(JSON)
    class Config:
        arbitrary_types_allowed = True


class Case(BaseModel):
    case_id: int
    created_at: datetime
    status: Status
    procedure_name: str
    cpt_codes: List[str]
    summary: Optional[str]
    is_met: bool
    is_complete: bool
    steps: List[Step]


engine = create_engine("sqlite:///database.db", echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
