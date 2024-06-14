from typing import Optional, List
from enum import Enum
from datetime import datetime

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
