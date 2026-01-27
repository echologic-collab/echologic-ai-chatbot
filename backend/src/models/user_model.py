from typing import Optional

from sqlmodel import Field

from src.models.base_model import BaseModel


class UserDb(BaseModel, table=True):
    __tablename__ = "users"
    name: Optional[str] = Field(default=None, nullable=True)
    email: Optional[str] = Field(default=None, unique=True, index=True)
    hashed_password: str = Field(nullable=False)
