import uuid as uuid_pkg # Using an alias to avoid NameError
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import DateTime
from sqlmodel import Field, SQLModel

class BaseModel(SQLModel):
    """
    Standard Base Model for tables with Integer IDs.
    Each field is defined to allow fresh column generation per table.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # We use default_factory so each record gets a unique string UUID
    uuid: str = Field(
        default_factory=lambda: str(uuid_pkg.uuid4()), 
        unique=True, 
        index=True
    )
    
    # Use sa_type instead of sa_column to avoid 'already assigned' errors
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True)
    )
    
    # Use sa_column_kwargs to handle the 'onupdate' trigger safely
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )

class BaseUUIDModel(SQLModel):
    """
    Base Model for tables using UUIDs as the Primary Key.
    """
    id: uuid_pkg.UUID = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True)
    )
    
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_type=DateTime(timezone=True),
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
    )