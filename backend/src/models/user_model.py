from typing import Optional

from sqlmodel import Field

from src.models.base_model import BaseModel


class UserDb(BaseModel, table=True):
    __tablename__ = "users_sync"
    __table_args__ = {"schema": "neon_auth"}
    name: Optional[str] = Field(default=None, nullable=True)
    email: Optional[str] = Field(default=None, unique=True, index=True)
