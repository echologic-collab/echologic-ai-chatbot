from typing import List, Optional
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

class Conversation(SQLModel, table=True):
    """
    Represents a chat session between a user and the AI.
    Independent from BaseModel to avoid metadata collision.
    """
    __tablename__ = "conversations"
    
    # Primary Key must be defined since we are not using inheritance
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # Audit timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign Key pointing to the users table created by your teammate
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    
    # Relationship with the Message model
    messages: List["Message"] = Relationship(back_populates="conversation")